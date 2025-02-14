import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';

export class SignUpPage extends BasePage {
  password: Locator;
  dayDropDown: Locator;
  monthDropDown: Locator;
  yearDropDown: Locator;
  firstName: Locator;
  lastName: Locator;
  address: Locator;
  country: Locator;
  state: Locator;
  city: Locator;
  zipCode: Locator;
  mobileNumber: Locator;
  readonly createAccount: Locator;

  constructor(page: Page) {
    super(page);
    this.password = page.locator('#password');
    this.dayDropDown = page.locator('#days');
    this.monthDropDown = page.locator('#months');
    this.yearDropDown = page.locator('#years');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipCode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');
    this.createAccount = page.locator('#form > div > div > div > div > form > button');
  }

  async enterUserDetails(userDetails: {
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
    Logger.info('Entering new user details');
    await this.firstName.fill(userDetails.firstName);
    await this.lastName.fill(userDetails.lastName);
    await this.password.fill(userDetails.password);
    await this.address.fill(userDetails.address);
    await this.country.selectOption(userDetails.country);
    await this.state.fill(userDetails.state);
    await this.city.fill(userDetails.city);
    await this.zipCode.fill(userDetails.zipcode);
    await this.mobileNumber.fill(userDetails.mobileNumber);
    await this.createAccount.click();
  }
}
