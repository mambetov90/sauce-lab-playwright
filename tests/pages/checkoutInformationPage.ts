import { Page, Locator, expect } from "@playwright/test";
import { BaseCommands } from "../utils/baseCommands";
import { testData } from "../resources/testData";

export class CheckoutInformationPage extends BaseCommands {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  /**
   * Fills the checkout information form with the provided values.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param postalCode - The postal code of the user.
   */
  async fillCheckoutInformationForm(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    console.log(
      `Filling checkout form with: ${firstName}, ${lastName}, ${postalCode}`,
    );
    await this.fillIntoElement(this.firstNameInput, firstName);
    await this.fillIntoElement(this.lastNameInput, lastName);
    await this.fillIntoElement(this.zipCodeInput, postalCode);
  }

  /**
   * Continues the checkout process after filling in the form.
   */
  async continueCheckoutProcess() {
    console.log("Continuing checkout process...");
    await this.clickOnElement(this.continueButton);

    await expect(this.page).toHaveURL(testData.expectedURLs.checkoutStepTwo);
    console.log(
      "Successfully continued to the next step of the checkout process.",
    );
  }

  /**
   * Verifies that the information entered in the checkout form is correct.
   */
  async verifyCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<boolean> {
    console.log(
      `Verifying checkout information: ${firstName}, ${lastName}, ${postalCode}`,
    );
    const actualFirstName = await this.firstNameInput.inputValue();
    const actualLastName = await this.lastNameInput.inputValue();
    const actualPostalCode = await this.zipCodeInput.inputValue();

    return (
      actualFirstName === firstName &&
      actualLastName === lastName &&
      actualPostalCode === postalCode
    );
  }
}
