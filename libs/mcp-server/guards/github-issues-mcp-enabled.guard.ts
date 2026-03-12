import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubIssuesMcpEnabledGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const mcpEnabled = this.configService.get<boolean>(
            'API_MCP_GITHUB_ISSUES_SERVER_ENABLED',
            false,
        );

        if (!mcpEnabled) {
            throw new ForbiddenException(
                'GitHub Issues MCP Service is disabled',
            );
        }

        return true;
    }
}
