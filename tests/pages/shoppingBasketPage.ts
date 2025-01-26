import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class ShoppingBasketPage extends BaseCommands {
  readonly shoppingBasketContainer: Locator;
  readonly itemQuantity: Locator;
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingBasketContainer = page.locator('[data-test="inventory-item"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Navigates to the checkout page and validates the URL.
   */
  async goToCheckout(): Promise<void> {
    console.log("Navigating to the checkout page...");
    await this.clickOnElement(this.checkoutButton);
    await expect(this.page).toHaveURL(testData.expectedURLs.checkoutStepOne);
    console.log("Successfully navigated to the checkout page.");
  }

  /**
   * Verifies the content of the shopping basket against expected values.
   */
  async verifyBasketContent({
    name,
    price,
    count,
  }: {
    name: string;
    price: string;
    count: number;
  }) {
    console.log("Verifying basket contents...");
    const actualItemCount = await this.getSelectedProductCount();
    expect(actualItemCount).toBe(count);
    console.log(`Item count verification passed: ${actualItemCount} items.`);

    const actualName = await this.getSelectedProductName();
    expect(actualName).toBe(name);
    console.log(`Item name verification passed: ${actualName}.`);

    const actualPrice = await this.getSelectedProductPrice();
    expect(actualPrice).toBe(price);
    console.log(`Item price verification passed: ${actualPrice}.`);

    console.log("All items, quantities, and prices match as expected.");
  }

  /**
   * Retrieves the name of the selected product.
   */
  async getSelectedProductName(): Promise<string> {
    return await this.getProductName(this.productName);
  }

  /**
   * Retrieves the price of the selected product.
   */
  async getSelectedProductPrice(): Promise<string> {
    return await this.getProductPrice(this.productPrice);
  }

  /**
   * Counts the number of selected products in the basket.
   */
  async getSelectedProductCount(): Promise<number> {
    return await this.getProductCount(this.shoppingBasketContainer);
  }

  /**
   * Checks if the "Remove" button is visible for a product.
   */
  async isRemoveButtonVisible(): Promise<boolean> {
    console.log("Checking if the remove button is visible...");
    return await this.isElementVisible(this.removeButton);
  }
}
