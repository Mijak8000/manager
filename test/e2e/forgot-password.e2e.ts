import { test, expect } from '@playwright/test';

test.describe('Forgot Password', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/forgot-password');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should load forgot password page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Reset your password/i }),
        ).toBeVisible();
    });

    test('should send reset email successfully', async ({ page }) => {
        await page.route(/\/user\/forgot-password/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.locator('input[name="email"]').fill('test@example.com');
        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(/check your email/i)).toBeVisible();
    });

    test('should navigate back to sign in', async ({ page }) => {
        await page.click('text=Back to Sign in');
        await page.waitForURL(/\/sign-in/);
    });
});

test.describe('Confirm Email', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/confirm-email');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should load confirm email page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Confirm your email/i }),
        ).toBeVisible();
    });

    test('should resend confirmation email', async ({ page }) => {
        await page.route(/\/user\/resend-confirmation/, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.click('text=Resend email');
        await page.waitForTimeout(1000);

        await expect(page.getByText(/email sent/i)).toBeVisible();
    });
});

test.describe('Invite', () => {
    test.beforeEach(async ({ page }) => {
        await page.route(/\/user\/register/, async (route) => {
            await route.fulfill({
                status: 201,
                body: JSON.stringify({
                    id: 'test-user-id',
                    email: 'test@example.com',
                    name: 'Test User',
                }),
            });
        });

        await page.goto('/invite/test-invite-id');
        await page.waitForLoadState('domcontentloaded');
    });

    test('should load invite page', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /Join/i }),
        ).toBeVisible();
    });

    test('should accept invite and create account', async ({ page }) => {
        await page.locator('input[name="name"]').fill('New User');
        await page.locator('input[name="password"]').fill('Test@123');
        await page.locator('input[name="confirmPassword"]').fill('Test@123');
        await page.waitForTimeout(500);

        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(3000);

        await expect(page).toHaveURL(/\/cockpit|\/setup/);
    });
});
