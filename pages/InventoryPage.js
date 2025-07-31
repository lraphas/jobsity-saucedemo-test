import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryImages = page.locator('.inventory_item_img img');
    }

    async assertOnInventoryPage() {
        await expect(this.page).toHaveURL(/.*inventory\.html/);
        await expect(this.inventoryList).toBeVisible();
    }

    async getImageSources() {
        return await this.page.$$eval('.inventory_item_img img', imgs =>
        imgs.map(img => img.getAttribute('src'))
        );
    }

    async assertImagesAreUnique() {
        const imageSrcs = await this.getImageSources();
        const uniqueImages = new Set(imageSrcs);
        expect(uniqueImages.size).toBe(imageSrcs.length);
    }
}