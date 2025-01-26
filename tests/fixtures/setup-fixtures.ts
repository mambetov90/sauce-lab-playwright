import { expect, test as setupTest } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { testData } from "../resources/testData";

type SetupFixtures = {
  loginPage: LoginPage;
};

export const test = setupTest.extend<SetupFixtures>({
  /**
   * Initializes and logs in using the `LoginPage` class.
   */
  loginPage: [
    async ({ page }, use) => {
      const loginPage = new LoginPage(page);

      console.log(
        "Starting test: Navigating to Saucedemo.com and logging in...",
      );

      const username = process.env.USER_NAME;
      const password = process.env.PASSWORD;

      try {
        await loginPage.navigateTo("");

        await loginPage.fillLoginForm(username!, password!);

        await loginPage.clickLoginButton();

        await expect(loginPage.page).toHaveURL(testData.expectedURLs.inventory);
        console.log("Login successful: Redirected to inventory page.");
      } catch (error) {
        console.error("ERROR: Login process failed.", error);
        throw error;
      }
      await use(loginPage);
    },
    { title: "Setup and Login to Saucedemo.com" },
  ],
});

export { expect };
