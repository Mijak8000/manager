import { test, expect } from '@playwright/test';

test.describe('Code Review Flow - Basic Navigation', () => {
    test('should load cockpit page', async ({ page }) => {
        await page.goto('/cockpit');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });

    test('should load sign-in page', async ({ page }) => {
        await page.goto('/sign-in');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        await expect(page.locator('text=Welcome')).toBeVisible({
            timeout: 5000,
        });
    });

    test('should load settings page', async ({ page }) => {
        await page.goto('/settings');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });

    test('should load integrations page', async ({ page }) => {
        await page.goto('/settings/integrations');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });

    test('should load git repositories page', async ({ page }) => {
        await page.goto('/settings/git/repositories');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });
});

test.describe('Git Integration - Basic Pages', () => {
    test('should load repositories page', async ({ page }) => {
        await page.goto('/settings/git/repositories');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });

    test('should load integrations page', async ({ page }) => {
        await page.goto('/settings/integrations');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });

    test('should load code review settings', async ({ page }) => {
        await page.goto('/settings/code-review');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
    });
});
