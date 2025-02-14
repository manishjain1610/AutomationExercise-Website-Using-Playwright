import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class RegistrationPage extends BasePage {
  readonly signupButton: Locator;
  readonly newUserSignupName: Locator;
  readonly newUserSignupEmail: Locator;
  readonly usedEmailAddressMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.signupButton = page.locator('#form > div > div > div:nth-child(3) > div > form > button');
    this.newUserSignupName = page.locator(
      '#form > div > div > div:nth-child(3) > div > form > input[type=text]:nth-child(2)'
    );
    this.newUserSignupEmail = page.locator(
      '#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)'
    );
    this.usedEmailAddressMessage = page.locator(
      '#form > div > div > div:nth-child(3) > div > form > p'
    );
  }

  async signUp(userDetails: {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    Logger.info('Signing up new user');
    await this.newUserSignupName.fill(userDetails.name);
    await this.newUserSignupEmail.fill(userDetails.email);
    await this.signupButton.click();
    // Verifying that email address has not already been added
    await expect(this.usedEmailAddressMessage).not.toBeVisible();
  }
}
