import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory Tests - SauceDemo', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('Check unique Inventory images with Standard User', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.assertImagesAreUnique();
  });

  test('Check unique Inventory images with Problem User', async () => {
    await loginPage.login('problem_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.assertImagesAreUnique();
  });
});