import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class CheckoutCompletePage extends BaseCommands {
  readonly backHomeButton: Locator;
  readonly thankForOrderLabel: Locator;
  readonly basketIcon: Locator;
  readonly shoppingCardBage: Locator;

  constructor(page: Page) {
    super(page);
    this.thankForOrderLabel = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.basketIcon = page.locator(".shopping_cart_link");
    this.shoppingCardBage = page.locator('[data-test="shopping-cart-badge"]');
  }

  /**
   * Navigates back to the inventory page after completing the checkout.
   * Asserts that we are redirected to the correct page.
   */
  async goBackToHomePage(): Promise<void> {
    console.log("Navigating back to the inventory page...");
    try {
      await this.clickOnElement(this.backHomeButton);
      await expect(this.page).toHaveURL(testData.expectedURLs.inventory);
      console.log("Successfully navigated back to the inventory page.");
    } catch (error) {
      console.error(`Error during navigation: ${error.message}`);
      throw new Error(
        `Failed to navigate back to inventory page: ${error.message}`,
      );
    }
  }

  /**
   * Verifies that the basket icon is empty after completing checkout.
   */
  async verifyBasketIsEmpty(): Promise<void> {
    console.log("Verifying that the basket is empty after checkout...");
    try {
      const productsCountInBasket = await this.getProductCount(
        this.basketIcon.locator(this.shoppingCardBage),
      );
      if (productsCountInBasket > 0) {
        throw new Error("Basket icon still shows products after checkout.");
      }
      console.log("Basket is empty after checkout as expected.");
    } catch (error) {
      console.error(`Error during basket verification: ${error.message}`);
      throw new Error(`Failed to verify basket is empty: ${error.message}`);
    }
  }
}
