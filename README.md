# E2E Testing Framework with Playwright

This project is an end-to-end testing framework built with Playwright and TypeScript for testing the Automation Exercise website.

## Features

- End-to-end test scenarios for shopping flow
- Page Object Model (POM) design pattern
- Mobile and desktop viewport support
- Random test data generation using Faker
- Performance testing with Lighthouse
- Allure reporting
- Winston logging

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Move to installation directory:

   cd "Your Directory"

2. Install dependencies:

   a. npm init -y

   b. npm install @playwright/test

   c. npx playwright install

   d. npm install -D allure-playwright

   e. npm install --save-dev eslint-plugin-playwright

   f. npm install --save-dev --save-exact prettier

   g. Copy .eslintrc.json and .prettierrc

   h. npm install winston (For logging)

   i. npm install csv-parse

   j. npm install @types/node --save-dev (For fs and path)

   k. npm install @faker-js/faker

   l. npm install --save-dev playwright-lighthouse playwright lighthouse

4. For Allure Reports only:

   Install Allure command line

      - npm install -g allure-commandline

   Add the allure.bat file path to PATH environment variable

   After test execution, generate Allure report using -

      - npm run allure:generate

   To view Allure report -

      - npm run allure:open


## Project Structure

```
├── src/
│   ├── pages/           # Page objects
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── ProductsPage.ts
│   │   |── RegistrationPage.ts
|   |   |── AccountCreatedPage.ts
|   |   |── SignUpPage.ts
|   |   └── ViewCartPage.ts
│   |── utils/
│   |   └── WinstonLogger.ts           # Winston logger configuration
│   └── data/
│       └── SelectProductNumber.csv    # File describing which product is to be selected
├── tests/
│   ├── ProductsPage.spec.ts           # End-to-end test scenarios
│   └── lighthouse.spec.ts             # Performance tests
├── playwright.config.ts               # Playwright configuration
├── package.json
└── tsconfig.json
```

## Running Tests

### Run tests with Allure report
   - npm run tests:chromeAllure

### Run tests in headed mode
   - npm run tests:chrome

### Run tests in non-UI mode
   - npm run tests:chromeNoHeaded

### Run tests for mobile viewport
   - npm run test:mobile    # Mobile viewport


### Run performance tests
   - npm run lighthouse


## Test Scenarios

The framework includes the following test scenarios:

1. Complete shopping flow:
   - Navigate to website
   - Browse products
   - Add third item to cart
   - Register new user
   - Complete checkout
   - Logout

2. Performance testing:
   - Homepage performance audit
   - Homepage Accessibility and Search Engine Optimization audit

## Logging

Test execution logs are stored in the `logs` directory. The logging system uses Winston and provides logging for test steps

## Reporting

The framework uses Allure for test reporting. Reports include:
- Test execution results
- Screenshots on failure
- Test steps and logs
- Performance metrics
