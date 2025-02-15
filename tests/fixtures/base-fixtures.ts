import { expect, test as baseTest } from "@playwright/test";
import { InventoryPage } from "../../tests/pages/inventoryPage";
import { ShoppingBasketPage } from "../../tests/pages/shoppingBasketPage";
import { CheckoutInformationPage } from "../../tests/pages/checkoutInformationPage";
import { CheckoutOverviewPage } from "../../tests/pages/checkoutOverviewPage";
import { CheckoutCompletePage } from "../../tests/pages/checkoutCompletePage";
import { InventoryProductInfoPage } from "../../tests/pages/inventoryProductInfoPage";

type BaseFixtures = {
  inventoryPage: InventoryPage;
  shoppingBasketPage: ShoppingBasketPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  inventoryProductInfoPage: InventoryProductInfoPage;
};

export const test = baseTest.extend<BaseFixtures>({
  /**
   * Initializes the `InventoryPage` class.
   */
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  /**
   * Initializes the `ShoppingBasketPage` class.
   */
  shoppingBasketPage: async ({ page }, use) => {
    const shoppingBasketPage = new ShoppingBasketPage(page);
    await use(shoppingBasketPage);
  },

  /**
   * Initializes the `CheckoutInformationPage` class.
   */
  checkoutInformationPage: async ({ page }, use) => {
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await use(checkoutInformationPage);
  },

  /**
   * Initializes the `CheckoutOverviewPage` class.
   */
  checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },

  /**
   * Initializes the `CheckoutCompletePage` class.
   */
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },

  /**
   * Initializes the `InventoryProductInfoPage` class.
   */
  inventoryProductInfoPage: async ({ page }, use) => {
    const inventoryProductInfoPage = new InventoryProductInfoPage(page);
    await use(inventoryProductInfoPage);
  },
});

export { expect };
