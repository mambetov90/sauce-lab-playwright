import { test, expect } from "../fixtures/fixtures";
import { testData } from "../resources/testData";
import * as allure from "allure-js-commons";

let inventoryPageShirtName;
let inventoryPageShirtPrice;
let productInfoPageShirtName;
let productInfoPageShirtPrice;
let productInfoPageShirtCount;
let overviewPageShirtName;
let overviewPageShirtPrice;
let overviewPageShirtCount;

test("Purchase Sauce T-Shirt", async ({
  loginPage,
  inventoryPage,
  inventoryProductInfoPage,
  shoppingBasketPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await allure.displayName("Purchase Sauce T-Shirt");
  await allure.owner("Artem M.");
  await allure.tags("Web interface", "Purchase", "T-Shirt");
  await allure.severity("critical");
  await allure.label("priority", "high");
  await allure.description(
    "TEST CASE: Purchase a T-Shirt from the inventory page, verify the product details, and complete the checkout process.",
  );
  await allure.step("Visit the inventory page", async () => {
    await loginPage.navigateTo("/inventory.html");
  });

  await allure.step("Add a product to the cart", async () => {
    await inventoryPage.addProductToCart(testData.inventory.productName);

    inventoryPageShirtName = await inventoryPage.getSelectedShirtText();
    inventoryPageShirtPrice = await inventoryPage.getSelectedShirtPrice();
  });

  await allure.step(
    "Visit the product info page and get the product details",
    async () => {
      await inventoryPage.goToProductInfo();

      productInfoPageShirtName =
        await inventoryProductInfoPage.getSelectedShirtText();

      productInfoPageShirtPrice =
        await inventoryProductInfoPage.getSelectedShirtPrice();

      productInfoPageShirtCount =
        await inventoryProductInfoPage.getSelectedProductCount();
    },
  );

  await allure.step("Visit the basket page", async () => {
    await inventoryProductInfoPage.goToBasket();
  });

  await allure.step(
    "Verify the basket content against the inventory page",
    async () => {
      await shoppingBasketPage.verifyBasketContent({
        name: inventoryPageShirtName,
        price: inventoryPageShirtPrice,
        count: 1,
      });
    },
  );

  await allure.step(
    "Verify the basket content against the product info page",
    async () => {
      await shoppingBasketPage.verifyBasketContent({
        name: productInfoPageShirtName,
        price: productInfoPageShirtPrice,
        count: productInfoPageShirtCount,
      });
    },
  );

  await allure.step("Proceed to checkout", async () => {
    await shoppingBasketPage.goToCheckout();
  });

  await allure.step("Fill out the checkout information form", async () => {
    await checkoutInformationPage.fillCheckoutInformationForm(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode,
    );
  });

  await allure.step("Verify the checkout information form", async () => {
    const isFormFilledCorrectly =
      await checkoutInformationPage.verifyCheckoutInformation(
        testData.checkout.firstName,
        testData.checkout.lastName,
        testData.checkout.postalCode,
      );
    expect(isFormFilledCorrectly).toBeTruthy();
  });

  await allure.step("Continue the checkout process", async () => {
    await checkoutInformationPage.continueCheckoutProcess();

    overviewPageShirtName = await checkoutOverviewPage.getSelectedShirtText();
    overviewPageShirtPrice = await checkoutOverviewPage.getSelectedShirtPrice();
    overviewPageShirtCount =
      await checkoutOverviewPage.getSelectedProductCount();
  });

  await allure.step("Verify the basket content", async () => {
    await shoppingBasketPage.verifyBasketContent({
      name: overviewPageShirtName,
      price: overviewPageShirtPrice,
      count: overviewPageShirtCount,
    });
  });

  await allure.step("Finish the checkout process", async () => {
    await checkoutOverviewPage.finishCheckoutProcess();
    await expect(checkoutCompletePage.thankForOrderLabel).toBeVisible();
  });

  await allure.step("Verify the basket is empty", async () => {
    await checkoutCompletePage.verifyBasketIsEmpty();
  });

  await allure.step("Go back to the home page", async () => {
    await checkoutCompletePage.goBackToHomePage();
  });
});
