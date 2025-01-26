import { Page, Locator } from "@playwright/test";

/**
 * A base class encapsulating common UI interaction commands for Playwright tests.
 * This class provides methods for interacting with and extracting data from page elements.
 */
export class BaseCommands {
  /**
   * Initializes a new instance of the BaseCommands class.
   * @param page - The Playwright Page object for the current browser context.
   */
  constructor(public page: Page) {}

  /**
   * Clicks on the specified element.
   * @param locator - Locator for the element to be clicked.
   * @param options - Optional Playwright click options (e.g., modifiers, position, button type, etc.).
   */
  async clickOnElement(
    locator: Locator,
    options?: Parameters<Locator["click"]>[0],
  ): Promise<void> {
    await this.waitForElement(locator, "visible");
    await locator.click(options);
  }

  /**
   * Fills the input field with the specified value.
   * @param locator - Locator for the input field to be filled.
   * @param value - The value to fill into the input field.
   */
  async fillIntoElement(locator: Locator, value: string): Promise<void> {
    await this.waitForElement(locator, "visible");
    await locator.fill(value);
  }

  /**
   * Waits for an element to reach the specified state within the timeout period.
   * @param locator - Locator for the element to wait for.
   * @param state - The desired state of the element (e.g., "visible", "attached").
   * @param timeout - Timeout in milliseconds (default is 20000ms).
   * @throws Error if the element does not reach the specified state within the timeout.
   */
  private async waitForElement(
    locator: Locator,
    state: "attached" | "visible" | "detached" | "hidden",
    timeout: number = 20000,
  ): Promise<void> {
    try {
      await locator.waitFor({ state, timeout });
    } catch (error) {
      throw new Error(
        `Element did not become ${state} within ${timeout}ms: ${error}`,
      );
    }
  }

  /**
   * Gets the text content of an element.
   * @param locator - Locator for the element.
   * @param errorMessage - Custom error message if no text is found (default is "Element not found").
   * @returns The text content of the element.
   * @throws Error if no text content is found.
   */
  async getElementText(
    locator: Locator,
    errorMessage = "Element not found",
  ): Promise<string> {
    await this.waitForElement(locator, "visible");

    const text = await locator.textContent();
    if (!text) {
      throw new Error(errorMessage);
    }

    return text.trim();
  }

  /**
   * Checks if an element is visible on the page.
   * @param locator - Locator for the element to check visibility.
   * @returns A boolean indicating whether the element is visible or not.
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await this.waitForElement(locator, "visible");
      return true;
    } catch {
      console.log("Element is not visible.");
      return false;
    }
  }

  /**
   * Gets the count of elements matching the provided locator.
   * @param locator - Locator for the elements to count.
   * @returns The number of matching elements.
   */
  async getProductCount(locator: Locator): Promise<number> {
    console.log("Counting elements...");
    return locator.count();
  }

  /**
   * Retrieves the name of a product from the specified element.
   * @param locator - Locator for the product name element.
   * @returns The name of the product.
   * @throws Error if the product name cannot be found.
   */
  async getProductName(locator: Locator): Promise<string> {
    console.log("Fetching product name...");
    return this.getElementText(locator, "Product name not found");
  }

  /**
   * Retrieves the price of a product from the specified element.
   * @param locator - Locator for the product price element.
   * @returns The price of the product.
   * @throws Error if the product price cannot be found.
   */
  async getProductPrice(locator: Locator): Promise<string> {
    console.log("Fetching product price...");
    return this.getElementText(locator, "Product price not found");
  }
}
