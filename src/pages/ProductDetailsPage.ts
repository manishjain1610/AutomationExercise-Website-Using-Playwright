import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class ProductDetailsPage extends BasePage {
  readonly productInformation: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addedMessageWindow: Locator;
  readonly addedMessageBody: Locator;
  readonly expectedAddedMessage: string;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productInformation = page.locator(
      'body > section > div > div > div.col-sm-9.padding-right > div.product-details > div.col-sm-7 > div.product-information'
    );
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');
    this.addedMessageWindow = page.locator('#cartModal > div > div');
    this.addedMessageBody = page.locator(
      '#cartModal > div > div > div.modal-body > p:nth-child(1)'
    );
    this.expectedAddedMessage = 'Your product has been added to cart.';
    this.continueShoppingButton = page.locator(
      '#cartModal > div > div > div.modal-footer > button'
    );
    this.viewCartLink = page.locator(
      '#cartModal > div > div > div.modal-body > p:nth-child(2) > a > u'
    );
  }

  // Set product quantity
  async setQuantity(quantity: number): Promise<void> {
    Logger.info(`Setting quantity to ${quantity}`);
    await this.quantityInput.fill(quantity.toString());
  }

  // Add current product to cart
  async addToCart(): Promise<void> {
    Logger.info('Adding product to cart');
    await this.click(this.addToCartButton);
    // Making sure that Item added message appears
    await expect(this.addedMessageWindow).toBeVisible();
    await expect(this.addedMessageBody).toContainText(this.expectedAddedMessage);
    await this.viewCartLink.click();
  }
}
