import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class InventoryProductInfoPage extends BaseCommands {
  readonly productName: Locator;
  readonly childAddToCartLocator = '[data-test^="add-to-cart"]';
  readonly selectedShirtContainer =
    'xpath=ancestor::*[@class="inventory_item"]';
  readonly removeButton = '[data-test^="remove"]';
  readonly shoppingCardIcon: Locator;
  readonly shirtPrice: Locator;
  shirtContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.shirtContainer = page.locator('[data-test="inventory-item"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.shoppingCardIcon = page.locator('[data-test="shopping-cart-link"]');
    this.shirtPrice = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Retrieves the text of the selected shirt.
   */
  async getSelectedShirtText(): Promise<string> {
    return await this.getProductName(
      this.shirtContainer.locator(this.productName),
    );
  }

  /**
   * Retrieves the price of the selected shirt.
   */
  async getSelectedShirtPrice(): Promise<string> {
    return await this.getProductPrice(
      this.shirtContainer.locator(this.shirtPrice),
    );
  }

  /**
   * Checks if the "Remove" button is visible for the selected product.
   */
  async isRemoveButtonVisible(): Promise<boolean> {
    console.log(
      "Checking if the remove button is visible for the selected shirt...",
    );
    return await this.isElementVisible(
      this.shirtContainer.locator(this.removeButton),
    );
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToBasket(): Promise<void> {
    console.log("Navigating to the shopping basket...");
    await this.clickOnElement(this.shoppingCardIcon);

    expect(await this.page.url()).toContain(
      testData.expectedURLs.shoppingBasket,
    );
    console.log("Successfully navigated to the basket page.");
  }

  /**
   * Counts the number of selected products on the inventory product page.
   */
  async getSelectedProductCount(): Promise<number> {
    return await this.getProductCount(this.shirtContainer);
  }
}
