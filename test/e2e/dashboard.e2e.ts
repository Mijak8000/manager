import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cockpit');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);
    });

    test('should load dashboard', async ({ page }) => {
        const url = page.url();

        if (url.includes('sign-in')) {
            test.skip(
                true,
                'Not logged in - requires running Docker or manual login',
            );
            return;
        }

        await expect(page).toHaveURL(/\/cockpit/);
    });

    test('should verify user is logged in', async ({ page }) => {
        const url = page.url();

        if (url.includes('sign-in')) {
            test.skip(
                true,
                'Not logged in - requires running Docker or manual login',
            );
            return;
        }

        await expect(page.getByText('Test User')).toBeVisible({
            timeout: 10000,
        });
    });
});
