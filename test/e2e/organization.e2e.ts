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
        if (url.includes('/cli-keys')) {
            await route.fulfill({ status: 200, body: JSON.stringify([]) });
            return;
        }
        if (url.includes('/sso')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ configured: false }),
            });
            return;
        }
        if (url.includes('/byok')) {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ configured: false }),
            });
            return;
        }
        await route.continue();
    });
}

test.describe('Organization - General', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/organization/general');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display organization settings', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Organization/i }),
        ).toBeVisible();
    });

    test('should display organization name', async ({ page }) => {
        await page.waitForTimeout(2000);
        await expect(page.getByText('Test Organization')).toBeVisible();
    });

    test('should update organization name', async ({ page }) => {
        await page.locator('input[name="name"]').fill('Updated Org Name');
        await page.click('button:has-text("Save")');
        await page.waitForTimeout(1000);
    });
});

test.describe('Organization - Cockpit', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/organization/cockpit');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display organization cockpit', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Organization/i }),
        ).toBeVisible();
    });

    test('should display team metrics', async ({ page }) => {
        await page.waitForTimeout(2000);
        const metrics = page.locator(
            '[class*="metric"], [data-testid*="metric"]',
        );
        const count = await metrics.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe('Organization - CLI Keys', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/organization/cli-keys');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display CLI keys page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /CLI Keys/i }),
        ).toBeVisible();
    });

    test('should create new CLI key', async ({ page }) => {
        await page.route(/\/api\/v1\/cli-keys/, async (route) => {
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 201,
                    body: JSON.stringify({
                        id: 'key-123',
                        key: 'kodus_xxxxxxxxxxxx',
                    }),
                });
            } else {
                await route.continue();
            }
        });

        await page.click('text=Create new key');
        await page.waitForTimeout(1000);

        await page.locator('input[name="name"]').fill('My CLI Key');
        await page.click('button:has-text("Create")');
        await page.waitForTimeout(2000);
    });
});

test.describe('Organization - SSO', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/organization/sso');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display SSO settings', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /SSO/i })).toBeVisible();
    });

    test('should configure SSO', async ({ page }) => {
        await page.click('text=Configure SSO');
        await page.waitForTimeout(1000);
    });
});

test.describe('Organization - BYOK', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuthenticated(page);
        await page.goto('/organization/byok');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should display BYOK settings', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /BYOK|Bring Your Own Key/i }),
        ).toBeVisible();
    });

    test('should configure BYOK', async ({ page }) => {
        await page.click('text=Configure');
        await page.waitForTimeout(1000);
    });
});
