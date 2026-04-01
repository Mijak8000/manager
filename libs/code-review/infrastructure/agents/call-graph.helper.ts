import { createLogger } from '@kodus/flow';
import { RemoteCommands } from '../adapters/services/collectCrossFileContexts.service';

const logger = createLogger('CallGraphHelper');

const MAX_CALLGRAPH_CHARS = 4000;
const MAX_FUNCTIONS = 10;
const MAX_CALLERS = 3;
const MAX_CALLEES = 5;
const BUILD_TIMEOUT_MS = 180_000;
const QUERY_TIMEOUT_MS = 15_000;

const GRAPH_DB_PATH = '.code-review-graph/graph.db';

// ---------------------------------------------------------------------------
// SQLite queries via python3 one-liners
// ---------------------------------------------------------------------------

/**
 * Write a Python script to a temp file, execute it, and parse JSON output.
 * This avoids shell quoting issues with SQL queries containing single/double quotes.
 */
async function runPythonScript(
    exec: (cmd: string) => Promise<{ stdout: string; exitCode?: number }>,
    scriptContent: string,
): Promise<string> {
    // Encode script as base64 — only alphanumeric + /+= chars, no quoting issues
    const b64 = Buffer.from(scriptContent).toString('base64');
    const { stdout } = await exec(
        `python3 -c "import base64;exec(base64.b64decode('${b64}').decode())"`,
    );
    return stdout || '';
}

async function queryGraphDb(
    exec: (cmd: string) => Promise<{ stdout: string; exitCode?: number }>,
    sql: string,
): Promise<any[]> {
    const script = [
        'import sqlite3,json',
        `db=sqlite3.connect("${GRAPH_DB_PATH}")`,
        'db.row_factory=sqlite3.Row',
        `rows=db.execute("""${sql}""").fetchall()`,
        'print(json.dumps([dict(r) for r in rows]))',
        'db.close()',
    ].join('\n');

    try {
        const stdout = await Promise.race([
            runPythonScript(exec, script),
            new Promise<string>((_, reject) =>
                setTimeout(() => reject(new Error('query timeout')), QUERY_TIMEOUT_MS),
            ),
        ]);

        if (!stdout?.trim()) return [];
        const jsonStart = stdout.indexOf('[');
        if (jsonStart < 0) return [];
        return JSON.parse(stdout.substring(jsonStart));
    } catch {
        return [];
    }
}

async function queryGraphDbParams(
    exec: (cmd: string) => Promise<{ stdout: string; exitCode?: number }>,
    sql: string,
    params: string[],
): Promise<any[]> {
    const paramsPython = params
        .map((p) => `"${p.replace(/"/g, '\\"')}"`)
        .join(',');

    const script = [
        'import sqlite3,json',
        `db=sqlite3.connect("${GRAPH_DB_PATH}")`,
        'db.row_factory=sqlite3.Row',
        `rows=db.execute("""${sql}""",(${paramsPython},)).fetchall()`,
        'print(json.dumps([dict(r) for r in rows]))',
        'db.close()',
    ].join('\n');

    try {
        const stdout = await Promise.race([
            runPythonScript(exec, script),
            new Promise<string>((_, reject) =>
                setTimeout(() => reject(new Error('query timeout')), QUERY_TIMEOUT_MS),
            ),
        ]);

        if (!stdout?.trim()) return [];
        const jsonStart = stdout.indexOf('[');
        if (jsonStart < 0) return [];
        return JSON.parse(stdout.substring(jsonStart));
    } catch {
        return [];
    }
}

// ---------------------------------------------------------------------------
// Call graph generation
// ---------------------------------------------------------------------------

interface FunctionInfo {
    name: string;
    qualified_name: string;
    params: string | null;
    return_type: string | null;
    file_path: string;
    line_start: number;
    callers: Array<{ name: string; file_path: string; line: number }>;
    callees: Array<{
        name: string;
        qualified_name: string;
        params: string | null;
        return_type: string | null;
        file_path: string;
        line_start: number;
    }>;
}

function formatCallGraph(
    functions: FunctionInfo[],
    calleeSignatures: Array<{
        name: string;
        params: string | null;
        return_type: string | null;
        file_path: string;
        line_start: number;
    }>,
): string {
    if (!functions.length) return '';

    const sections: string[] = [];

    for (const fn of functions) {
        const shortFile = fn.file_path.split('/').slice(-2).join('/');
        const sig = fn.params ? `${fn.name}${fn.params}` : fn.name;
        const ret = fn.return_type ? ` -> ${fn.return_type}` : '';

        const lines: string[] = [`${sig}${ret}  (${shortFile}:${fn.line_start})`];

        for (const caller of fn.callers) {
            const callerShort = caller.file_path.split('/').slice(-2).join('/');
            lines.push(
                `  ← called by ${caller.name} (${callerShort}:${caller.line})`,
            );
        }
        if (fn.callers.length === 0) {
            lines.push('  (no production callers found)');
        }

        for (const callee of fn.callees) {
            const calleeShort = callee.file_path.split('/').slice(-2).join('/');
            const calleeSig = callee.params
                ? `${callee.name}${callee.params}`
                : callee.name;
            const calleeRet = callee.return_type
                ? ` -> ${callee.return_type}`
                : '';
            lines.push(
                `  → calls ${calleeSig}${calleeRet}  (${calleeShort}:${callee.line_start})`,
            );
        }

        sections.push(lines.join('\n'));
    }

    let result =
        'Changed functions (tree-sitter AST):\n\n' + sections.join('\n\n');

    // Callee signatures section
    const sigs = calleeSignatures.filter((s) => s.params);
    if (sigs.length > 0) {
        const sigLines = sigs.map((s) => {
            const shortFile = s.file_path.split('/').slice(-2).join('/');
            const ret = s.return_type ? ` -> ${s.return_type}` : '';
            return `  ${s.name}${s.params}${ret}  (${shortFile}:${s.line_start})`;
        });
        result +=
            '\n\nCallee signatures (verify callsites match):\n' +
            sigLines.join('\n');
    }

    return result;
}

/**
 * Generates a call graph using code-review-graph (tree-sitter based).
 *
 * 1. Builds the AST graph in the sandbox
 * 2. Queries SQLite for changed functions, callers, callees with signatures
 * 3. Returns formatted text for the agent prompt
 */
export async function generateCallGraph(
    remoteCommands: RemoteCommands,
    changedFiles: Array<{
        filename: string;
        patch?: string;
        patchWithLinesStr?: string;
    }>,
    _repositoryFullName?: string,
): Promise<string> {
    if (!remoteCommands.exec || changedFiles.length === 0) return '';

    const exec = remoteCommands.exec;
    const startTime = Date.now();

    // Step 1: Build the graph
    try {
        logger.log({
            message: `[CALL-GRAPH] Building tree-sitter graph for ${changedFiles.length} changed files...`,
            context: 'CallGraphHelper',
        });

        const buildResult = await Promise.race([
            exec('code-review-graph build'),
            new Promise<{ stdout: string; exitCode?: number }>((_, reject) =>
                setTimeout(
                    () => reject(new Error('build timeout')),
                    BUILD_TIMEOUT_MS,
                ),
            ),
        ]);

        const buildTime = Date.now() - startTime;
        const statsMatch = buildResult.stdout?.match(
            /(\d+) files.*?(\d+) nodes.*?(\d+) edges/,
        );

        logger.log({
            message: `[CALL-GRAPH] Build completed in ${buildTime}ms${statsMatch ? `: ${statsMatch[1]} files, ${statsMatch[2]} nodes, ${statsMatch[3]} edges` : ''}`,
            context: 'CallGraphHelper',
        });
    } catch (err) {
        logger.warn({
            message: `[CALL-GRAPH] Build failed after ${Date.now() - startTime}ms: ${err instanceof Error ? err.message : String(err)}`,
            context: 'CallGraphHelper',
        });
        return '';
    }

    // Step 2: Query functions in changed files
    try {
        const filePaths = changedFiles.map((f) => f.filename);
        const fileConditions = filePaths
            .map((f) => `file_path LIKE '%${f.replace(/'/g, "''")}'`)
            .join(' OR ');

        const rawFunctions = await queryGraphDb(
            exec,
            `SELECT name, qualified_name, params, return_type, file_path, line_start FROM nodes WHERE (${fileConditions}) AND kind = 'Function' ORDER BY file_path, line_start LIMIT ${MAX_FUNCTIONS}`,
        );

        if (rawFunctions.length === 0) {
            logger.log({
                message: '[CALL-GRAPH] No functions found in changed files',
                context: 'CallGraphHelper',
            });
            return '';
        }

        // Step 3: For each function, get callers and callees
        const functions: FunctionInfo[] = [];

        for (const fn of rawFunctions) {
            const callers = await queryGraphDbParams(
                exec,
                `SELECT n.name, n.file_path, e.line FROM edges e JOIN nodes n ON n.qualified_name = e.source_qualified WHERE e.target_qualified = ? AND e.kind = 'CALLS' AND n.file_path NOT LIKE '%test%' AND n.file_path NOT LIKE '%spec%' LIMIT ${MAX_CALLERS}`,
                [fn.qualified_name],
            );

            const callees = await queryGraphDbParams(
                exec,
                `SELECT n.name, n.qualified_name, n.params, n.return_type, n.file_path, n.line_start FROM edges e JOIN nodes n ON n.qualified_name = e.target_qualified WHERE e.source_qualified = ? AND e.kind = 'CALLS' LIMIT ${MAX_CALLEES}`,
                [fn.qualified_name],
            );

            functions.push({
                ...fn,
                callers,
                callees,
            });
        }

        // Step 4: Collect unique callee signatures
        const calleeQnames = new Set<string>();
        for (const fn of functions) {
            for (const c of fn.callees) {
                calleeQnames.add(c.qualified_name);
            }
        }

        const calleeSignatures: any[] = [];
        if (calleeQnames.size > 0) {
            const qnameConditions = [...calleeQnames]
                .slice(0, 50)
                .map((q) => `qualified_name = '${q.replace(/'/g, "''")}'`)
                .join(' OR ');

            const sigs = await queryGraphDb(
                exec,
                `SELECT name, params, return_type, file_path, line_start FROM nodes WHERE (${qnameConditions})`,
            );
            calleeSignatures.push(...sigs);
        }

        // Step 5: Format
        let callGraph = formatCallGraph(functions, calleeSignatures);

        if (callGraph.length > MAX_CALLGRAPH_CHARS) {
            callGraph =
                callGraph.substring(0, MAX_CALLGRAPH_CHARS) +
                '\n... (truncated)';
        }

        const totalTime = Date.now() - startTime;

        logger.log({
            message: `[CALL-GRAPH] Generated ${callGraph.length} chars in ${totalTime}ms (${functions.length} functions, ${calleeSignatures.length} signatures)`,
            context: 'CallGraphHelper',
            metadata: {
                chars: callGraph.length,
                functions: functions.length,
                signatures: calleeSignatures.length,
                totalTimeMs: totalTime,
                preview: callGraph.substring(0, 300),
            },
        });

        return callGraph;
    } catch (err) {
        logger.warn({
            message: `[CALL-GRAPH] Query failed: ${err instanceof Error ? err.message : String(err)}`,
            context: 'CallGraphHelper',
        });
        return '';
    }
}
