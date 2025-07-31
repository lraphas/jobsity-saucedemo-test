import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login Tests - SauceDemo', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();
  });

  test('Locked out User', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });
});