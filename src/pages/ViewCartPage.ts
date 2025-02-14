import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class ViewCartPage extends BasePage {
  readonly proceedtoCheckOutButton: Locator;
  readonly checkoutWindow: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedtoCheckOutButton = page.locator('#do_action > div.container > div > div > a');
    this.checkoutWindow = page.locator('#checkoutModal > div > div');
    this.registerLoginLink = page.locator(
      '#checkoutModal > div > div > div.modal-body > p:nth-child(2) > a > u'
    );
  }

  async moveToCheckout() {
    Logger.info('Proceeding to checkout');
    this.proceedtoCheckOutButton.click();
    // Making sure that Checkout window message is visible
    await expect(this.checkoutWindow).toBeVisible();
    this.registerLoginLink.click();
  }
}
