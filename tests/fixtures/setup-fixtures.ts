import { test as setupTest } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

type SetupFixtures = {
  loginPage: LoginPage;
};

export const test = setupTest.extend<SetupFixtures>({
  /**
   * Initializes and logs in using the `LoginPage` class.
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
