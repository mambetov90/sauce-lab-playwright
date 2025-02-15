import { test, expect } from "../fixtures/fixtures";
import { testData } from "../resources/testData";

test("Purchase Sauce T-Shirt", async ({
  loginPage,
  inventoryPage,
  inventoryProductInfoPage,
  shoppingBasketPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await loginPage.navigateTo("/inventory.html");

  await inventoryPage.addProductToCart(testData.inventory.productName);

  const inventoryPageShirtName = await inventoryPage.getSelectedShirtText();

  const inventoryPageShirtPrice = await inventoryPage.getSelectedShirtPrice();

  await inventoryPage.goToProductInfo();

  const productInfoPageShirtName =
    await inventoryProductInfoPage.getSelectedShirtText();

  const productInfoPageShirtPrice =
    await inventoryProductInfoPage.getSelectedShirtPrice();

  const productInfoPageShirtCount =
    await inventoryProductInfoPage.getSelectedProductCount();

  await inventoryProductInfoPage.goToBasket();

  await shoppingBasketPage.verifyBasketContent({
    name: inventoryPageShirtName,
    price: inventoryPageShirtPrice,
    count: 1,
  });

  await shoppingBasketPage.verifyBasketContent({
    name: productInfoPageShirtName,
    price: productInfoPageShirtPrice,
    count: productInfoPageShirtCount,
  });

  await shoppingBasketPage.goToCheckout();

  await checkoutInformationPage.fillCheckoutInformationForm(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.postalCode,
  );

  const isFormFilledCorrectly =
    await checkoutInformationPage.verifyCheckoutInformation(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode,
    );
  expect(isFormFilledCorrectly).toBeTruthy();

  await checkoutInformationPage.continueCheckoutProcess();

  const overviewPageShirtName =
    await checkoutOverviewPage.getSelectedShirtText();
  const owerviewPageShirtPrice =
    await checkoutOverviewPage.getSelectedShirtPrice();
  const owerviewPageShirtCount =
    await checkoutOverviewPage.getSelectedProductCount();

  await shoppingBasketPage.verifyBasketContent({
    name: overviewPageShirtName,
    price: owerviewPageShirtPrice,
    count: owerviewPageShirtCount,
  });

  await checkoutOverviewPage.finishCheckoutProcess();

  await expect(checkoutCompletePage.thankForOrderLabel).toBeVisible();

  await checkoutCompletePage.verifyBasketIsEmpty();
  await checkoutCompletePage.goBackToHomePage();
});
