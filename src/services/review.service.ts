import { api } from './api/index.js';
import { authService } from './auth.service.js';
import { gitService } from './git.service.js';
import { getTrialIdentifier } from '../utils/rate-limit.js';
import { loadConfig } from '../utils/config.js';
import { CLI_VERSION } from '../constants.js';
import type { ReviewConfig, ReviewResult, TrialReviewResult, PullRequestSuggestionsResponse } from '../types/index.js';

class ReviewService {
  async analyze(
    diff: string,
    rulesOnly?: boolean,
    fast?: boolean,
    options?: { files?: string[]; staged?: boolean; commit?: string; branch?: string }
  ): Promise<ReviewResult> {
    const token = await authService.getValidToken();

    const reviewConfig: ReviewConfig = {
      rulesOnly,
      fast,
    };

    if (!fast) {
      reviewConfig.files = await gitService.getFullFileContents(
        options?.files,
        {
          staged: options?.staged,
          commit: options?.commit,
          branch: options?.branch,
        }
      );
    }

    const teamConfig = await loadConfig();
    const isTeamKey = token.startsWith('kodus_');

    if (isTeamKey && teamConfig) {
      const gitInfo = await gitService.getGitInfo();
      const inferredPlatform = gitInfo.remote
        ? gitService.inferPlatform(gitInfo.remote)
        : undefined;

      return api.review.analyzeWithMetrics(
        diff,
        token,
        reviewConfig,
        {
          userEmail: gitInfo.userEmail,
          gitRemote: gitInfo.remote || undefined,
          branch: gitInfo.branch,
          commitSha: gitInfo.commitSha,
          inferredPlatform,
          cliVersion: CLI_VERSION,
        }
      );
    }

    return api.review.analyze(diff, token, reviewConfig);
  }

  async getPullRequestSuggestions(params: { prUrl?: string; prNumber?: number; repositoryId?: string; format?: 'markdown'; severity?: string; category?: string }): Promise<{ result: ReviewResult; markdown?: string }> {
    if (!params.prUrl && !(params.prNumber && params.repositoryId)) {
      throw new Error('Provide prUrl or prNumber with repositoryId to fetch pull request suggestions.');
    }

    const token = await authService.getValidToken();
    const response = await api.review.getPullRequestSuggestions(token, params);
    return {
      result: this.normalizeSuggestionsResponse(response),
      markdown: response.markdown,
    };
  }

  async trialAnalyze(diff: string): Promise<TrialReviewResult> {
    const fingerprint = await getTrialIdentifier();
    return api.review.trialAnalyze(diff, fingerprint);
  }

  private normalizeSuggestionsResponse(response: PullRequestSuggestionsResponse): ReviewResult {
    const issues = response.issues ?? response.suggestions ?? [];
    return {
      summary: response.summary ?? 'Pull request suggestions',
      issues,
      filesAnalyzed: response.filesAnalyzed ?? issues.length,
      duration: response.duration ?? 0,
    };
  }
}

export const reviewService = new ReviewService();
