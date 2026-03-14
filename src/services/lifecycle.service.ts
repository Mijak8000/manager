import { createRequire } from 'node:module';
import { gitService } from './git.service.js';
import { hookLogger } from './hook-logger.service.js';
import { transcriptService } from './transcript.service.js';
import { saveLocal, loadLocal, removeLocal } from './session-local.service.js';
import { api } from './api/index.js';
import type {
    LifecycleEvent,
    AgentType,
    ToolCall,
    FileChange,
} from '../types/session.js';
import type { SessionApiEvent } from '../types/session-events.js';
import {
    buildSessionEndEvent,
    buildSessionStartEvent,
    buildSubagentEndEvent,
    buildSubagentStartEvent,
    buildTurnEndEvent,
    buildTurnStartEvent,
} from './lifecycle-events.js';
import {
    createEmptyTokenUsage,
} from './lifecycle-turn-data.js';
import { collectTurnTranscriptData } from './lifecycle-transcript.js';
import {
    getBranchSafe,
    getHeadSafe,
    getRemoteSafe,
} from './lifecycle-git-context.js';
import { createTurnLocalState } from './lifecycle-local-turn-state.js';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json') as { version: string };

function sendEvent(event: SessionApiEvent, repoRoot: string): void {
    // Fire and forget — never blocks the agent
    api.sessions.sendEvent(event, repoRoot).catch(() => {});
}

class LifecycleService {
    async dispatch(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.init(repoRoot);

        switch (event.type) {
            case 'SessionStart':
                await this.handleSessionStart(repoRoot, agentType, event);
                break;
            case 'TurnStart':
                await this.handleTurnStart(repoRoot, agentType, event);
                break;
            case 'TurnEnd':
                await this.handleTurnEnd(repoRoot, agentType, event);
                break;
            case 'SessionEnd':
                await this.handleSessionEnd(repoRoot, agentType, event);
                break;
            case 'SubagentStart':
                await this.handleSubagentStart(repoRoot, agentType, event);
                break;
            case 'SubagentEnd':
                await this.handleSubagentEnd(repoRoot, agentType, event);
                break;
        }
    }

    // -------------------------------------------------------------------------
    // Session Start
    // -------------------------------------------------------------------------

    private async handleSessionStart(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('session-start', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
            transcript_path: event.sessionRef,
        });

        const [branch, baseCommit, gitRemote] = await Promise.all([
            getBranchSafe(gitService),
            getHeadSafe(gitService),
            getRemoteSafe(gitService),
        ]);

        sendEvent(
            buildSessionStartEvent({
                sessionId: event.sessionId,
                branch,
                timestamp: new Date().toISOString(),
                agentType,
                gitRemote,
                baseCommit,
                cliVersion: pkg.version,
            }),
            repoRoot,
        );
    }

    // -------------------------------------------------------------------------
    // Turn Start (user-prompt-submit)
    // -------------------------------------------------------------------------

    private async handleTurnStart(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('turn-start', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
            prompt: event.prompt?.slice(0, 200),
        });

        const [branch, commitBefore] = await Promise.all([
            getBranchSafe(gitService),
            getHeadSafe(gitService),
        ]);

        const turnId = `${Date.now()}`;

        const transcriptPath = event.sessionRef ?? '';
        const fs = await import('fs/promises');
        const localTurnState = await createTurnLocalState({
            turnId,
            transcriptPath,
            stat: fs.stat,
        });

        await saveLocal(repoRoot, event.sessionId, localTurnState);

        sendEvent(
            buildTurnStartEvent({
                sessionId: event.sessionId,
                branch,
                timestamp: new Date().toISOString(),
                turnId,
                prompt: event.prompt ?? '',
                commitBefore,
            }),
            repoRoot,
        );
    }

    // -------------------------------------------------------------------------
    // Turn End (stop / post-todo)
    // -------------------------------------------------------------------------

    private async handleTurnEnd(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('turn-end', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
        });

        const local = await loadLocal(repoRoot, event.sessionId);
        const turnId = local?.turnId ?? '';
        const transcriptPath = local?.transcriptPath ?? event.sessionRef ?? '';
        const transcriptOffset = local?.transcriptOffset ?? 0;

        let toolCalls: ToolCall[] = [];
        let filesModified: FileChange[] = [];
        let filesRead: string[] = [];
        let commands: string[] = [];
        let tokenUsage = createEmptyTokenUsage();
        let response = '';

        if (transcriptPath) {
            ({
                toolCalls,
                filesModified,
                filesRead,
                commands,
                tokenUsage,
                response,
            } = await collectTurnTranscriptData({
                transcriptPath,
                transcriptOffset,
                transcriptService,
                hookLogger,
            }));
        }

        const [branch, commitAfter] = await Promise.all([
            getBranchSafe(gitService),
            getHeadSafe(gitService),
        ]);

        sendEvent(
            buildTurnEndEvent({
                sessionId: event.sessionId,
                branch,
                timestamp: new Date().toISOString(),
                turnId,
                response,
                toolCalls,
                filesModified,
                filesRead,
                commands,
                tokenUsage,
                commitAfter,
            }),
            repoRoot,
        );
    }

    // -------------------------------------------------------------------------
    // Session End
    // -------------------------------------------------------------------------

    private async handleSessionEnd(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('session-end', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
        });

        const branch = await getBranchSafe(gitService);

        sendEvent(
            buildSessionEndEvent({
                sessionId: event.sessionId,
                branch,
                timestamp: new Date().toISOString(),
            }),
            repoRoot,
        );

        // Clean up local session file
        await removeLocal(repoRoot, event.sessionId);
    }

    // -------------------------------------------------------------------------
    // Subagent Start (pre-task)
    // -------------------------------------------------------------------------

    private async handleSubagentStart(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('subagent-start', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
            tool_use_id: event.toolUseId,
            subagent_type: event.subagentType,
            task_description: event.taskDescription?.slice(0, 200),
        });

        if (!event.toolUseId) {
            return;
        }

        const branch = await getBranchSafe(gitService);

        sendEvent(
            buildSubagentStartEvent({
                event,
                branch,
                timestamp: new Date().toISOString(),
            }),
            repoRoot,
        );
    }

    // -------------------------------------------------------------------------
    // Subagent End (post-task)
    // -------------------------------------------------------------------------

    private async handleSubagentEnd(
        repoRoot: string,
        agentType: AgentType,
        event: LifecycleEvent,
    ): Promise<void> {
        await hookLogger.info('subagent-end', 'lifecycle', {
            agent: agentType,
            model_session_id: event.sessionId,
            tool_use_id: event.toolUseId,
        });

        if (!event.toolUseId) {
            return;
        }

        const branch = await getBranchSafe(gitService);

        sendEvent(
            buildSubagentEndEvent({
                sessionId: event.sessionId,
                branch,
                timestamp: new Date().toISOString(),
                toolUseId: event.toolUseId,
            }),
            repoRoot,
        );
    }
}

export const lifecycleService = new LifecycleService();
