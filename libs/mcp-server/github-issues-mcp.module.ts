import { DynamicModule, Module, Provider, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GithubModule } from '@libs/platform/modules/github.module';

import { GithubIssuesMcpController } from './controllers/github-issues-mcp.controller';
import { GithubIssuesMcpEnabledGuard } from './guards/github-issues-mcp-enabled.guard';
import { McpCoreModule } from './mcp-core.module';
import { GithubIssuesMcpServerService } from './services/github-issues-mcp-server.service';
import { GithubIssuesTools } from './tools/githubIssues.tools';

@Module({})
export class GithubIssuesMcpModule {
    static forRoot(configService?: ConfigService): DynamicModule {
        const imports: any[] = [McpCoreModule];
        const providers: Provider[] = [];
        const controllers = [];
        const exports: Provider[] = [McpCoreModule];

        const isEnabled =
            process.env.API_MCP_GITHUB_ISSUES_SERVER_ENABLED === 'true' ||
            configService?.get<boolean>(
                'API_MCP_GITHUB_ISSUES_SERVER_ENABLED',
                false,
            );

        if (isEnabled) {
            imports.push(forwardRef(() => GithubModule));

            controllers.push(GithubIssuesMcpController);

            providers.push(
                GithubIssuesMcpServerService,
                GithubIssuesMcpEnabledGuard,
                GithubIssuesTools,
            );

            exports.push(GithubIssuesMcpServerService);
        }

        return {
            module: GithubIssuesMcpModule,
            imports,
            controllers,
            providers,
            exports,
            global: true,
        };
    }
}
