import type { TrialReviewResult, ReviewResult } from '../../types/review.js';

export function shouldUseInteractiveReview(params: {
    isAgent: boolean;
    interactive?: boolean;
    output?: string;
    format?: string;
}): boolean {
    return (
        (!params.isAgent && params.interactive === true) ||
        (!params.isAgent &&
            !params.output &&
            params.format === 'terminal')
    );
}

export function shouldFailReview(
    result: ReviewResult,
    failOn?: string,
): boolean {
    if (!failOn) {
        return false;
    }

    const severityOrder: Record<string, number> = {
        info: 0,
        warning: 1,
        error: 2,
        critical: 3,
    };

    const threshold = severityOrder[failOn] ?? 0;
    return result.issues.some(
        (issue) => (severityOrder[issue.severity] ?? 0) >= threshold,
    );
}

export function formatTrialCompletionMessage(
    result: TrialReviewResult,
): string {
    if (result.trialInfo) {
        return `Review complete! (Trial: ${result.trialInfo.reviewsUsed}/${result.trialInfo.reviewsLimit} reviews today)`;
    }

    if (result.rateLimit) {
        const used = Math.max(
            0,
            result.rateLimit.limit - result.rateLimit.remaining,
        );
        return `Review complete! (Trial: ${used}/${result.rateLimit.limit} reviews today)`;
    }

    return 'Review complete! (Trial mode)';
}
