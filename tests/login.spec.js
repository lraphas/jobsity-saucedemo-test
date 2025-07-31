import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login Tests - SauceDemo', () => {
  
  test('Sucessfull Login', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Loocked out User', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});