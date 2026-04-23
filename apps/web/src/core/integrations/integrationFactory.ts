import { INTEGRATIONS_KEY } from "@enums";
import type { PublicConfig } from "@config/publicConfig";

import { AzureReposConnection } from "./azureReposConnection";
import { BitbucketConnection } from "./bitbucketConnection";
import { ForgejoConnection } from "./forgejoConnection";
import { GitHubConnection } from "./gitHubConnection";
import { GitlabConnection } from "./gitlabConnection";
import { IIntegrationConnector } from "./IIntegrationConnector";

class IntegrationFactory {
    // Connectors that do not (yet) depend on PublicConfig stay as singletons
    // instantiated at module load. Wave 3 will also move GitHub and Bitbucket
    // into the per-call branch below.
    private staticConnectors: Record<string, IIntegrationConnector>;

    constructor() {
        this.staticConnectors = {
            [INTEGRATIONS_KEY.GITHUB]: new GitHubConnection(),
            [INTEGRATIONS_KEY.BITBUCKET]: new BitbucketConnection(),
            [INTEGRATIONS_KEY.AZURE_REPOS]: new AzureReposConnection(),
            [INTEGRATIONS_KEY.FORGEJO]: new ForgejoConnection(),
        };
    }

    getConnector(
        key: string,
        cfg: PublicConfig,
    ): IIntegrationConnector | null {
        const k = key.toLowerCase();
        if (k === INTEGRATIONS_KEY.GITLAB) {
            // Instantiated per-call so GitLab OAuth values can come from
            // useConfig() in the caller — no process.env reads in the
            // client bundle.
            return new GitlabConnection(cfg);
        }
        return this.staticConnectors[k] ?? null;
    }
}

const factoryInstance = new IntegrationFactory();

export default factoryInstance;
