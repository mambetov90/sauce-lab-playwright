import { Page, Locator } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";

export class LoginPage extends BaseCommands {
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  /**
   * Constructor to initialize the Page object.
   * @param page - The Playwright Page instance used for interacting with the browser.
   */
  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator('[data-test="login-button"]');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
  }

  /**
   * Navigate to a specific URL or fallback base URL.
   * @param endpoint - The endpoint to navigate to.
   * @returns The current instance for method chaining.
   */
  async navigateTo(endpoint?: string): Promise<this> {
    const baseUrl = process.env.URL || "https://www.saucedemo.com";
    console.log(`Navigating to: ${baseUrl}${endpoint || ""}`);
    await this.page.goto(`${baseUrl}${endpoint || ""}`, {
      waitUntil: "domcontentloaded",
    });
    return this;
  }

  /**
   * Fill in the login form with a username and password.
   * @param username - The username to input.
   * @param password - The password to input.
   * @returns The current instance for method chaining.
   */
  async fillLoginForm(username: string, password: string): Promise<this> {
    if (!(await this.usernameInput.isVisible())) {
      throw new Error("Username input field is not visible.");
    }
    if (!(await this.passwordInput.isVisible())) {
      throw new Error("Password input field is not visible.");
    }

    console.log(`Filling in login form.`);
    await this.fillIntoElement(this.usernameInput, username);
    await this.fillIntoElement(this.passwordInput, password);
    return this;
  }

  /**
   * Click the login button.
   * @returns The current instance for method chaining.
   */
  async clickLoginButton(): Promise<this> {
    if (!(await this.loginButton.isVisible())) {
      throw new Error("Login button is not visible.");
    }

    console.log("Clicking on login button.");
    await this.clickOnElement(this.loginButton);
    return this;
  }
}
