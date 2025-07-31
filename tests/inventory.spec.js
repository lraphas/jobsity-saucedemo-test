import { test } from '@playwright/test';
import usersData from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory Tests - SauceDemo', () => {
  let loginPage;
  let user;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('Check unique Inventory images with Standard User', async () => {
    user = usersData.standard_user;

    await loginPage.login(user.username, user.password);
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.assertImagesAreUnique();
  });

  test('Check unique Inventory images with Problem User', async () => {
    user = usersData.problem_user;

    await loginPage.login(user.username, user.password);
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.assertImagesAreUnique();
  });
});