import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class CheckoutOverviewPage extends BaseCommands {
  readonly shoppingOverviewContainer: Locator;
  readonly itemQuantity: Locator;
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingOverviewContainer = page.locator(
      '[data-test="inventory-item"]',
    );
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="finish"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Retrieves the text of the selected shirt.
   */
  async getSelectedShirtText(): Promise<string> {
    console.log("Fetching text for the selected shirt...");
    return await this.getProductName(
      this.shoppingOverviewContainer.locator(this.productName),
    );
  }

  /**
   * Retrieves the price of the selected shirt.
   */
  async getSelectedShirtPrice(): Promise<string> {
    console.log("Fetching price for the selected shirt...");
    return await this.getProductPrice(
      this.shoppingOverviewContainer.locator(this.productPrice),
    );
  }

  /**
   * Counts the number of selected products on the checkout overview page.
   */
  async getSelectedProductCount(): Promise<number> {
    console.log("Counting selected products on the checkout overview page...");
    return await this.getProductCount(this.shoppingOverviewContainer);
  }

  /**
   * Completes the checkout process and verifies redirection to the checkout complete page.
   */
  async finishCheckoutProcess(): Promise<void> {
    console.log("Attempting to finish checkout...");
    try {
      await this.clickOnElement(this.checkoutButton);
      await expect(this.page).toHaveURL(testData.expectedURLs.checkoutComplete);
      console.log("Checkout process completed successfully.");
    } catch (error) {
      console.error(`Error during checkout completion: ${error.message}`);
      throw new Error(`Failed to complete checkout: ${error.message}`);
    }
  }
}
