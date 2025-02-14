import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class AccountCreatedPage extends BasePage {
  readonly accountCreatedMessage: Locator;
  readonly successMessage: string;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedMessage = page.locator('#form > div > div > div > h2 > b');
    this.successMessage = 'Account Created!';
    this.continueButton = page.locator('#form > div > div > div > div > a');
  }

  async verifyAccountCreation() {
    // Verifying that account creation page has loaded
    expect(await this.page.title()).toEqual(this.accountCreatePageTitle);
    //Verifying that account creation success message is displayed
    expect(this.accountCreatedMessage).toContainText(this.successMessage);
    Logger.info('Verified that account has been succesfully created.');
    await this.continueButton.click();
  }
}
