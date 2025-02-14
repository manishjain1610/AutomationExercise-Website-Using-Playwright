import { Page, Locator, expect } from '@playwright/test';
import Logger from '../utils/WinstonLogger';

// Base Class that can be imported by other classes for common functionality

export class BasePage {
  /*
        Page elements. The Test cases, API testing, Video tutorials and other elements are being ignored for time being.
        But they can be added later as per the need when more test scenarios are automated.
    */
  readonly page: Page;

  readonly automationExercisebBanner: Locator;
  readonly homeButton: Locator;
  readonly productsButton: Locator;
  readonly cartButton: Locator;
  readonly signupLoginButton: Locator;
  readonly contactUsButton: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly homePageTitle: string;
  readonly productPageTitle: string;
  readonly cartPageTitle: string;
  readonly signupLoginPageTitle: string;
  readonly signupPageTitle: string;
  readonly contactUsPageTitle: string;
  readonly accountCreatePageTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.automationExercisebBanner = page.locator('.col-sm-4 > div > a > img');
    this.homeButton = page.locator('.col-sm-8 > div > ul > li:nth-child(1) > a');
    this.productsButton = page.locator('.col-sm-8 > div > ul > li:nth-child(2) > a');
    this.cartButton = page.locator('.col-sm-8 > div > ul > li:nth-child(3) > a');
    this.signupLoginButton = page.locator('.col-sm-8 > div > ul > li:nth-child(4) > a');
    this.contactUsButton = page.locator('.col-sm-8 > div > ul > li:nth-child(8) > a');
    this.logoutButton = page.locator('.col-sm-8 > div > ul > li:nth-child(4) > a');
    this.deleteAccountButton = page.locator('.col-sm-8 > div > ul > li:nth-child(5) > a');
    this.homePageTitle = 'Automation Exercise';
    this.productPageTitle = 'Automation Exercise - All Products';
    this.cartPageTitle = 'Automation Exercise - Checkout';
    this.signupLoginPageTitle = 'Automation Exercise - Signup / Login';
    this.signupPageTitle = 'Automation Exercise - Signup';
    this.contactUsPageTitle = 'Automation Exercise - Contact Us';
    this.accountCreatePageTitle = 'Automation Exercise - Account Created';
  }

  // Load Home Page
  async loadHomePage() {
    await this.page.goto('/');
    expect(await this.page.title()).toEqual(this.homePageTitle);
  }

  // Navigate to a specific URL
  async navigate(url: string) {
    await this.page.goto(url);
  }

  // Wait for an element to be visible using element locator
  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  // Click an element
  async click(locator: Locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  // Type text into an input field * @param locator - The input field locator * @param text - The text to type
  async type(locator: Locator, text: string) {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  // Get text from an element @param locator - The element locator @returns The element text
  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return locator.innerText();
  }

  // Check if an element is visible @param locator - The element locator @returns True if the element is visible
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  // Assert that an element contains specific text @param locator - The element locator @param text - The expected text
  async assertText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  // Assert that an element is visible @param locator - The element locator
  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  // Wait for page load state
  protected async waitForPageLoad(): Promise<void> {
    Logger.info('Waiting for page load');
    await this.page.waitForLoadState('networkidle');
  }
}
