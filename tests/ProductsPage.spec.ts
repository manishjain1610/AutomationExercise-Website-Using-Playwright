import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { ProductDetailsPage } from '../src/pages/ProductDetailsPage';
import { ViewCartPage } from '../src/pages/ViewCartPage';
import { RegistrationPage } from '../src/pages/RegistrationPage';
import { SignUpPage } from '../src/pages/SignUpPage';
import { AccountCreatedPage } from '../src/pages/AccountCreatedPage';
import Logger from '../src/utils/WinstonLogger';
import { faker } from '@faker-js/faker';

test.describe('Products Page Tests', async () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let productDetailsPage: ProductDetailsPage;
  let viewCartPage: ViewCartPage;
  let registrationPage: RegistrationPage;
  let signUpPage: SignUpPage;
  let accountCreatedPage: AccountCreatedPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    viewCartPage = new ViewCartPage(page);
    registrationPage = new RegistrationPage(page);
    signUpPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
  });

  test('Select Given Product', async ({ page }) => {
    // Step 1: Navigate to website
    Logger.info('Loading Website Home Page');
    await homePage.loadHomePage();

    // Step 2: Go to Products section
    Logger.info('Navigating to Products Page');
    await homePage.navigateToProductsPage();

    // Step 3: View third product details
    Logger.info('Selecting Specified Product');
    await productsPage.selectSpecifiedProduct();

    // Step 4: Set random quantity
    const quantity = Math.floor(Math.random() * 20) + 1;
    Logger.info(`Setting quantity to ${quantity}`);
    await productDetailsPage.setQuantity(quantity);

    // Step 5: Add to cart
    Logger.info('Adding product to cart');
    await productDetailsPage.addToCart();

    // Step 6: View cart and checkout
    Logger.info('Viewing product in cart');
    await viewCartPage.moveToCheckout();

    // Step 7: Register new user
    Logger.info('Registering new user');
    const userDetails = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      country: 'India',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.helpers.fromRegExp('[6-9]{1}[0-9]{9}'),
    };
    await registrationPage.signUp(userDetails);
    await signUpPage.enterUserDetails(userDetails);

    // Step 8: Verify account creation
    Logger.info('Verifying account creation');
    await accountCreatedPage.verifyAccountCreation();

    // Step 9: Logout
    Logger.info('Logging out');
    await homePage.logout();
  });
});
