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
        if (url.includes('/subscription/plans')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify([
                    { id: 'free', name: 'Free', price: 0 },
                    { id: 'pro', name: 'Pro', price: 29 },
                    { id: 'enterprise', name: 'Enterprise', price: 99 },
                ]),
            });
            return;
        }
        if (url.includes('/usage/tokens')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    total: 100000,
                    used: 25000,
                    breakdown: [
                        { model: 'gpt-4', tokens: 15000 },
                        { model: 'claude-3', tokens: 10000 },
                    ],
                }),
            });
            return;
        }
        if (url.includes('/logs')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    items: [
                        {
                            id: 'log-1',
                            action: 'pull_request.opened',
                            timestamp: '2024-01-01T00:00:00Z',
                            user: 'testuser',
                        },
                    ],
                    total: 1,
                }),
            });
            return;
        }
        await route.continue();
    });
}

test.describe('Choose Plan', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/choose-plan');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display choose plan page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Choose.*Plan|Pricing/i }),
        ).toBeVisible();
    });

    test('should display all plans', async ({ page }) => {
        await page.waitForTimeout(2000);
        await expect(page.getByText('Free')).toBeVisible();
        await expect(page.getByText('Pro')).toBeVisible();
        await expect(page.getByText('Enterprise')).toBeVisible();
    });

    test('should select free plan', async ({ page }) => {
        await page.route(/\/api\/v1\/subscription\/create/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });
        await page.click(
            'button:has-text("Get started"), button:has-text("Select")',
        );
        await page.waitForTimeout(2000);
    });
});

test.describe('Token Usage', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/token-usage');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display token usage page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Token.*Usage|Usage/i }),
        ).toBeVisible();
    });

    test('should display usage statistics', async ({ page }) => {
        await page.waitForTimeout(2000);
        const usage = page.locator('[class*="usage"], [data-testid*="usage"]');
        const count = await usage.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display breakdown by model', async ({ page }) => {
        await page.waitForTimeout(2000);
        await expect(page.getByText('gpt-4')).toBeVisible();
        await expect(page.getByText('claude-3')).toBeVisible();
    });
});

test.describe('User Logs', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/user-logs');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display user logs page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Logs|Activity/i }),
        ).toBeVisible();
    });

    test('should display logs list', async ({ page }) => {
        await page.waitForTimeout(2000);
        const log = page.locator('[class*="log"], [data-testid*="log"]');
        await expect(log.first()).toBeVisible();
    });

    test('should filter logs by action', async ({ page }) => {
        await page.click('text=Opened');
        await page.waitForTimeout(1000);
    });

    test('should export logs', async ({ page }) => {
        await page.click('text=Export');
        await page.waitForTimeout(1000);
    });
});
