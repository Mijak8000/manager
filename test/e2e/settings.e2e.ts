import { test, expect } from '@playwright/test';

async function mockAuthenticated(page: any) {
    await page.route(/\/api\/auth\/session/, async (route) => {
        await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    id: 'test-user-id',
                    email: 'test@example.com',
                    name: 'Test User',
                },
            }),
        });
    });

    await page.route(/\/api\/v1\/.*/, async (route) => {
        const url = route.request().url();
        if (url.includes('/organization')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    id: 'org-123',
                    name: 'Test Organization',
                    slug: 'test-org',
                }),
            });
            return;
        }
        if (url.includes('/integrations')) {
            await route.fulfill({ status: 200, body: JSON.stringify([]) });
            return;
        }
        if (url.includes('/repositories')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify([
                    { id: 'repo-1', name: 'test-repo', provider: 'github' },
                ]),
            });
            return;
        }
        if (url.includes('/subscription')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ plan: 'free', status: 'active' }),
            });
            return;
        }
        if (url.includes('/plugins')) {
            await route.fulfill({ status: 200, body: JSON.stringify([]) });
            return;
        }
        await route.continue();
    });
}

test.describe('Settings - General', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display settings page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Settings/i }),
        ).toBeVisible();
    });

    test('should display navigation tabs', async ({ page }) => {
        await expect(page.getByText('General')).toBeVisible();
        await expect(page.getByText('Integrations')).toBeVisible();
        await expect(page.getByText('Git')).toBeVisible();
    });

    test('should navigate to integrations', async ({ page }) => {
        await page.click('text=Integrations');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/settings\/integrations/);
    });

    test('should navigate to git settings', async ({ page }) => {
        await page.click('text=Git');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/settings\/git/);
    });
});

test.describe('Settings - Integrations', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings/integrations');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display integrations page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Integrations/i }),
        ).toBeVisible();
    });

    test('should display available integrations', async ({ page }) => {
        await expect(page.getByText('GitHub')).toBeVisible();
        await expect(page.getByText('GitLab')).toBeVisible();
        await expect(page.getByText('Azure Repos')).toBeVisible();
        await expect(page.getByText('Bitbucket')).toBeVisible();
    });
});

test.describe('Settings - Git Repositories', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings/git');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display git settings page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Repositories/i }),
        ).toBeVisible();
    });

    test('should display repository list', async ({ page }) => {
        await page.waitForTimeout(2000);
        await expect(page.getByText('test-repo')).toBeVisible();
    });

    test('should sync repositories', async ({ page }) => {
        await page.route(/\/api\/v1\/repositories\/sync/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });
        await page.click('text=Sync');
        await page.waitForTimeout(2000);
    });
});

test.describe('Settings - Code Review', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings/code-review');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display code review settings', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Code Review/i }),
        ).toBeVisible();
    });
});

test.describe('Settings - Subscription', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings/subscription');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display subscription page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Subscription/i }),
        ).toBeVisible();
    });

    test('should display current plan', async ({ page }) => {
        await page.waitForTimeout(2000);
        await expect(page.getByText(/free|pro|enterprise/i)).toBeVisible();
    });

    test('should navigate to upgrade', async ({ page }) => {
        await page.click('text=Upgrade, text=Change plan');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/choose-plan/);
    });
});

test.describe('Settings - Plugins', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/settings/plugins');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display plugins page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Plugins/i }),
        ).toBeVisible();
    });
});
