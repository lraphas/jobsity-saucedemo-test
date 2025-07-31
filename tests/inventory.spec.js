import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Inventory Tests - SauceDemo', () => {
  
  test('Check unique Inventory images with Standard User', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    const imageSrcs = await page.$$eval('.inventory_item_img img', imgs =>
      imgs.map(img => img.getAttribute('src'))
    );

    const uniqueImages = new Set(imageSrcs);

    expect(uniqueImages.size).toBe(imageSrcs.length);
  });

  test('Check unique Inventory images with Problem User', async ({ page }) => {
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    const imageSrcs = await page.$$eval('.inventory_item_img img', imgs =>
      imgs.map(img => img.getAttribute('src'))
    );

    const uniqueImages = new Set(imageSrcs);

    expect(uniqueImages.size).toBe(imageSrcs.length);
  });
});