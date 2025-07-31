import { test } from '@playwright/test';
import usersData from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login Tests - SauceDemo', () => {
  let loginPage;
  let user;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    user = usersData.standard_user;

    await loginPage.login(user.username, user.password);
    await inventoryPage.assertOnInventoryPage();
  });

  test('Locked out User', async () => {
  user = usersData.locked_out_user;

    await loginPage.login(user.username, user.password);
    await loginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });
});