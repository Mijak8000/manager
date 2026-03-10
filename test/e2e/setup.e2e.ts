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

test.describe('Setup - Choose Workspace', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/setup');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display choose workspace page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Choose your workspace/i }),
        ).toBeVisible();
    });

    test('should create new workspace', async ({ page }) => {
        await page.route(/\/organization\/create/, async (route) => {
            await route.fulfill({
                status: 201,
                body: JSON.stringify({
                    id: 'new-org-id',
                    name: 'New Organization',
                    slug: 'new-organization',
                }),
            });
        });

        await page.click('text=Create new workspace');
        await page.waitForTimeout(1000);

        await page.locator('input[name="name"]').fill('My New Organization');
        await page.click('button:has-text("Continue")');
        await page.waitForTimeout(2000);

        await expect(page).toHaveURL(/\/setup\/choosing-repositories/);
    });

    test('should join existing workspace', async ({ page }) => {
        await page.click('text=Join existing workspace');
        await page.waitForTimeout(1000);

        await expect(page).toHaveURL(/\/setup\/choose-workspace/);
    });
});

test.describe('Setup - Choose Repositories', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/setup/choosing-repositories');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display choosing repositories page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Choose repositories/i }),
        ).toBeVisible();
    });

    test('should connect GitHub repository', async ({ page }) => {
        await page.route(/\/repository/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify([
                    {
                        id: 'repo-1',
                        name: 'test-repo',
                        fullName: 'org/test-repo',
                    },
                ]),
            });
        });

        await page.click('text=Connect GitHub');
        await page.waitForTimeout(2000);

        await page.locator('input[type="checkbox"]').first().check();
        await page.waitForTimeout(500);

        await page.click('text=Continue');
        await page.waitForTimeout(2000);

        await expect(page).toHaveURL(/\/setup\/connecting-git-tool/);
    });

    test('should skip repository selection', async ({ page }) => {
        await page.click('text=Skip for now');
        await page.waitForTimeout(1000);

        await expect(page).toHaveURL(/\/setup\/connecting-git-tool/);
    });
});

test.describe('Setup - Connect Git Tool', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/setup/connecting-git-tool');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display connecting git tool page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Connect git tool/i }),
        ).toBeVisible();
    });

    test('should install CLI', async ({ page }) => {
        await page.route(/\/cli\/install/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.click('text=Install CLI');
        await page.waitForTimeout(2000);
    });

    test('should skip CLI installation', async ({ page }) => {
        await page.click('text=Skip for now');
        await page.waitForTimeout(1000);

        await expect(page).toHaveURL(/\/setup\/customize-team/);
    });
});

test.describe('Setup - Customize Team', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/setup/customize-team');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display customize team page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Customize your team/i }),
        ).toBeVisible();
    });

    test('should invite team members', async ({ page }) => {
        await page.route(/\/team\/invite/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.locator('input[name="emails"]').fill('teammate@example.com');
        await page.click('text=Send invites');
        await page.waitForTimeout(1000);
    });

    test('should continue without inviting', async ({ page }) => {
        await page.click('text=Continue');
        await page.waitForTimeout(1000);

        await expect(page).toHaveURL(/\/setup\/subscription/);
    });
});

test.describe('Setup - Subscription', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/setup/subscription');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display subscription page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Choose your plan/i }),
        ).toBeVisible();
    });

    test('should select free plan', async ({ page }) => {
        await page.route(/\/subscription\/create/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.click('text=Get started free');
        await page.waitForTimeout(2000);

        await expect(page).toHaveURL(/\/cockpit/);
    });

    test('should navigate to pricing', async ({ page }) => {
        await page.click('text=View all plans');
        await page.waitForTimeout(1000);

        await expect(page).toHaveURL(/\/choose-plan/);
    });
});
