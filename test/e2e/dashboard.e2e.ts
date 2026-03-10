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
        if (url.includes('/team')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ id: 'team-123', name: 'Test Team' }),
            });
            return;
        }
        if (url.includes('/repository')) {
            await route.fulfill({ status: 200, body: JSON.stringify([]) });
            return;
        }
        await route.continue();
    });
}

test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/cockpit');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);
    });

    test('should load dashboard', async ({ page }) => {
        await expect(page).toHaveURL(/\/cockpit/);
    });

    test('should verify user is logged in', async ({ page }) => {
        await expect(page.getByText('Test User')).toBeVisible({
            timeout: 10000,
        });
    });

    test('should display cockpit dashboard', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Dashboard|Overview|Cockpit/i }),
        ).toBeVisible();
    });

    test('should display metrics cards', async ({ page }) => {
        await page.waitForTimeout(2000);
        const metrics = page.locator(
            '[class*="metric"], [data-testid*="metric"]',
        );
        await expect(metrics.first()).toBeVisible();
    });

    test('should navigate to PRs', async ({ page }) => {
        await page.click('text=Pull Requests');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/pull-requests/);
    });

    test('should navigate to issues', async ({ page }) => {
        await page.click('text=Issues');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/issues/);
    });
});

test.describe('Pull Requests', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.route(/\/api\/v1\/pull-requests/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    items: [
                        {
                            id: 'pr-1',
                            title: 'Test PR',
                            state: 'open',
                            author: 'testuser',
                            repository: 'test-repo',
                        },
                    ],
                    total: 1,
                }),
            });
        });
        await page.goto('/pull-requests');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display pull requests page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Pull Requests/i }),
        ).toBeVisible();
    });

    test('should display PR list', async ({ page }) => {
        await page.waitForTimeout(2000);
        const prList = page.locator('[class*="pr-"], [class*="pull-request"]');
        await expect(prList.first()).toBeVisible();
    });

    test('should filter PRs by state', async ({ page }) => {
        await page.click('text=Open');
        await page.waitForTimeout(1000);
        await page.click('text=Merged');
        await page.waitForTimeout(1000);
    });

    test('should search PRs', async ({ page }) => {
        const searchInput = page.locator(
            'input[type="search"], input[placeholder*="Search"]',
        );
        await searchInput.fill('test');
        await searchInput.press('Enter');
        await page.waitForTimeout(1000);
    });
});

test.describe('Issues', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.route(/\/api\/v1\/issues/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    items: [
                        {
                            id: 'issue-1',
                            title: 'Test Issue',
                            state: 'open',
                            author: 'testuser',
                            repository: 'test-repo',
                        },
                    ],
                    total: 1,
                }),
            });
        });
        await page.goto('/issues');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display issues page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Issues/i }),
        ).toBeVisible();
    });

    test('should display issue list', async ({ page }) => {
        await page.waitForTimeout(2000);
        const issueList = page.locator('[class*="issue-"]');
        await expect(issueList.first()).toBeVisible();
    });

    test('should filter issues by state', async ({ page }) => {
        await page.click('text=Open');
        await page.waitForTimeout(1000);
        await page.click('text=Closed');
        await page.waitForTimeout(1000);
    });

    test('should search issues', async ({ page }) => {
        const searchInput = page.locator(
            'input[type="search"], input[placeholder*="Search"]',
        );
        await searchInput.fill('test');
        await searchInput.press('Enter');
        await page.waitForTimeout(1000);
    });
});
