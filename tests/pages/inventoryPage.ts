import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class InventoryPage extends BaseCommands {
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
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.shoppingCardIcon = page.locator('[data-test="shopping-cart-link"]');
    this.shirtPrice = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Adds a product to the shopping cart based on the name provided.
   */
  async addProductToCart(productName: string): Promise<void> {
    console.log(
      `Attempting to add product containing "${productName}" to the cart...`,
    );
    const shirts = this.productName.filter({ hasText: `${productName}` });

    const shirtsCount = await this.getProductCount(shirts);
    console.log(`Number of items containing ${productName}: ${shirtsCount}`);

    if (shirtsCount === 0) {
      throw new Error(`No product containing ${productName} was found.`);
    }

    // Pick a random index from the filtered items
    const randomIndex = Math.floor(Math.random() * shirtsCount);

    // Select the corresponding item at the random index
    const selectRandomShirt = shirts.nth(randomIndex);

    this.shirtContainer = selectRandomShirt.locator(
      this.selectedShirtContainer,
    );

    expect(await this.shirtContainer.count()).toBe(1);

    const addToCartButton = this.shirtContainer.locator(
      this.childAddToCartLocator,
    );

    console.log("Selected product has been added to the basket.");
    await this.clickOnElement(addToCartButton);
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

    expect(await this.page).toHaveURL(testData.expectedURLs.shoppingBasket);
    console.log("Successfully navigated to the basket page.");
  }

  /**
   * Navigates to the inventory product page.
   */
  async goToProductInfo(): Promise<void> {
    console.log("Navigating to the inventory product...");
    await this.clickOnElement(this.shirtContainer.locator(this.productName));

    expect(await this.page.url()).toContain(
      testData.expectedURLs.inventoryProduct,
    );
    console.log("Successfully navigated to the inventory poduct page.");
  }
}
