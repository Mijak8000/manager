export interface SSORedirectErrorInfo {
    reasonCode: string;
    failureCode: string;
    message: string;
}

const DEFAULT_SSO_ERROR: SSORedirectErrorInfo = {
    reasonCode: 'sso-auth-failed',
    failureCode: 'SSO_AUTH_FAILED',
    message:
        'Unable to validate the SSO response. Verify your SSO settings and try again.',
};

export const mapSSOError = (error: unknown): SSORedirectErrorInfo => {
    const rawMessage =
        (error as { message?: string })?.message ||
        (error as { response?: { message?: string } })?.response?.message ||
        '';

    const message = String(rawMessage).toLowerCase();

    if (message.includes('invalid email')) {
        return {
            reasonCode: 'sso-invalid-email-assertion',
            failureCode: 'SSO_INVALID_EMAIL_ASSERTION',
            message: 'The SSO assertion does not contain a valid email.',
        };
    }

    if (message.includes('sso config not found')) {
        return {
            reasonCode: 'sso-config-not-found',
            failureCode: 'SSO_CONFIG_NOT_FOUND',
            message: 'SSO is not configured for this organization.',
        };
    }

    if (
        message.includes('signature') ||
        message.includes('assertion') ||
        message.includes('response')
    ) {
        return {
            reasonCode: 'sso-invalid-assertion',
            failureCode: 'SSO_INVALID_ASSERTION',
            message: 'The identity provider response could not be validated.',
        };
    }

    if (message.includes('inresponseto')) {
        return {
            reasonCode: 'sso-expired-request',
            failureCode: 'SSO_EXPIRED_REQUEST',
            message: 'The SSO request expired. Start the login flow again.',
        };
    }

    return DEFAULT_SSO_ERROR;
};
