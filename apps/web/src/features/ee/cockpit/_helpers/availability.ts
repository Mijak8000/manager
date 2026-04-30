import { isSelfHosted } from "src/core/utils/self-hosted";

export function shouldBlockCockpitForMissingAnalyticsSecret({
    isSelfHostedDeployment = isSelfHosted,
    analyticsSecret = process.env.WEB_ANALYTICS_SECRET,
}: {
    isSelfHostedDeployment?: boolean;
    analyticsSecret?: string;
} = {}): boolean {
    return !isSelfHostedDeployment && !analyticsSecret;
}
