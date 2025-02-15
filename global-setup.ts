import { test } from "./tests/fixtures/setup-fixtures";
import { testData } from "./tests/resources/testData";
import { expect } from "@playwright/test";

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

test("Login to Saucedemo.com", async ({ page, loginPage }) => {
  await loginPage.navigateTo("");

  await loginPage.fillLoginForm(username!, password!);

  await loginPage.clickLoginButton();

  await expect(loginPage.page).toHaveURL(testData.expectedURLs.inventory);

  page.context().storageState({ path: "./LoginAuth.json" });

  console.log("Login successful: Redirected to inventory page.");
});
