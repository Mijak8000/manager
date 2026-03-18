import type { PullRequestExecution } from "./types";

/**
 * Constrói a URL real do Pull Request baseado no provider e dados do repositório
 */
export const buildPullRequestUrl = (pr: PullRequestExecution): string => {
    const { provider, repositoryId, prNumber, url } = pr;

    // Tenta extrair informações da URL da API para construir a URL real
    switch (provider) {
        case "GITHUB":
            // GitHub API URL: https://api.github.com/repos/{owner}/{repo}/pulls/{number}
            if (url && url.includes("api.github.com")) {
                const apiMatch = url.match(
                    /api\.github\.com\/repos\/([^\/]+)\/([^\/]+)\/pulls/,
                );
                if (apiMatch) {
                    const [, owner, repo] = apiMatch;
                    return `https://github.com/${owner}/${repo}/pull/${prNumber}`;
                }
            }
            // Se a URL já é do GitHub (não API), usa ela
            if (
                url &&
                url.includes("github.com") &&
                !url.includes("api.github.com")
            ) {
                return url;
            }
            break;

        case "GITLAB":
            if (url) {
                const gitlabApiMatch = url.match(
                    /^(?:https?:\/\/)?([^\/]+)\/api\/v4\/projects\/([^\/]+)/,
                );
                if (gitlabApiMatch) {
                    const [, host, projectId] = gitlabApiMatch;
                    const hostname = host.startsWith("api.")
                        ? host.replace("api.", "")
                        : host;
                    if (pr.repositoryName) {
                        return `https://${hostname}/${pr.repositoryName}/-/merge_requests/${prNumber}`;
                    }
                    return `https://${hostname}/projects/${projectId}/-/merge_requests/${prNumber}`;
                }
                try {
                    const parsedUrl = new URL(url);
                    if (
                        !url.includes("/api/") &&
                        (parsedUrl.hostname === "gitlab.com" ||
                            parsedUrl.hostname.endsWith(".gitlab.com"))
                    ) {
                        return url;
                    }
                } catch {
                    // ignore parse errors
                }
            }
            break;

        case "BITBUCKET":
            // Bitbucket API URL: https://api.bitbucket.org/2.0/repositories/{workspace}/{repo}/pullrequests/{number}
            if (url && url.includes("api.bitbucket.org")) {
                const apiMatch = url.match(
                    /api\.bitbucket\.org\/2\.0\/repositories\/([^\/]+)\/([^\/]+)/,
                );
                if (apiMatch) {
                    const [, workspace, repo] = apiMatch;
                    return `https://bitbucket.org/${workspace}/${repo}/pull-requests/${prNumber}`;
                }
            }
            // Se a URL já é do Bitbucket (não API), usa ela
            if (
                url &&
                url.includes("bitbucket.org") &&
                !url.includes("api.bitbucket.org")
            ) {
                return url;
            }
            break;

        case "AZURE_REPOS":
            // Azure DevOps tem URLs complexas, por enquanto mantém a original
            if (
                url &&
                url.includes("dev.azure.com") &&
                !url.includes("/_apis/")
            ) {
                return url;
            }
            // Tenta construir URL básica se tiver informações suficientes
            if (url && url.includes("/_apis/")) {
                const azureMatch = url.match(
                    /dev\.azure\.com\/([^\/]+)\/([^\/]+)\/_apis/,
                );
                if (azureMatch && pr.repositoryName) {
                    const [, organization, project] = azureMatch;
                    return `https://dev.azure.com/${organization}/${project}/_git/${pr.repositoryName}/pullrequest/${prNumber}`;
                }
            }
            break;
    }

    // Fallback: se não conseguiu construir uma URL específica, usa a original ou placeholder
    if (url && !url.includes("/api") && !url.includes("/_apis/")) {
        return url;
    }

    // Último fallback: link interno temporário
    return `#pr-${prNumber}`;
};

/**
 * Verifica se a URL é válida (não é da API)
 */
export const isValidPullRequestUrl = (url: string): boolean => {
    return Boolean(url && !url.includes("/api/") && url.startsWith("http"));
};
