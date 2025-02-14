import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // * Navigate to Products page by clicking on Products button
  async navigateToProductsPage() {
    Logger.info('Navigating to Products page');
    await this.click(this.productsButton);
    expect(await this.page.title()).toEqual(this.productPageTitle);
  }

  // * Navigate to Cart page by clicking on Cart button
  async navigateToCartPage() {
    Logger.info('Navigating to Cart page');
    await this.click(this.cartButton);
    expect(await this.page.title()).toEqual(this.cartPageTitle);
  }

  // * Navigate to Cart page by clicking on Signup/Login button
  async navigateToSignupPage() {
    Logger.info('Navigating to Signup/Login page');
    await this.click(this.signupLoginButton);
    expect(await this.page.title()).toEqual(this.signupLoginPageTitle);
  }

  // * Navigate to Contact us page by clicking on Contact Us button
  async navigateToContactUsPage() {
    Logger.info('Navigating to Contact Us page');
    await this.click(this.contactUsButton);
    expect(await this.page.title()).toEqual(this.contactUsPageTitle);
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/.*\/login/);
  }
}
