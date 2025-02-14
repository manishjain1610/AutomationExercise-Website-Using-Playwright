import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/WinstonLogger';
import * as fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class ProductsPage extends BasePage {
  readonly productList: Locator;
  readonly productNameOffset: Locator;
  readonly viewProductOffset: Locator;
  readonly addToCartOffset: Locator;
  readonly currentDataDirectory: string;
  readonly inputFile: string;

  constructor(page: Page) {
    super(page);
    this.productList = page.locator(
      'body > section:nth-child(3) > div > div > div.col-sm-9.padding-right > div > div.col-sm-4'
    );
    this.productNameOffset = page.locator(
      'div.product-image-wrapper > div.single-products > div.product-overlay > div.overlay-content > p'
    );
    this.viewProductOffset = page.locator('div.product-image-wrapper > div.choose > ul > li > a');
    this.addToCartOffset = page.locator(
      'div.product-image-wrapper > div.single-products > div.product-overlay > div > a > i'
    );
    this.currentDataDirectory = './src/data/';
    this.inputFile = 'SelectProductNumber.csv';
  }

  async selectSpecifiedProduct() {
    Logger.info('Listing all products');
    // Locate all product elements

    // Loop through products and extract text
    const productCount = await this.productList.count();
    // Total number of products displayed on page
    console.log('Product count is ' + productCount);
    // Logging the names of all products on page. This step can be skipped if detailed logging is not needed
    for (let i = 0; i < productCount; i++) {
      const name = await this.productList.nth(i).locator(this.productNameOffset).textContent();
      Logger.info(`Product ${i + 1}: ${name}`);
    }

    // Getting the product number to select from a file.
    // It could have been passed simply as parameter but I wanted to get it from a file so as to make it scalable/maintainable in future.
    const productToBuy = await this.returnProductNumber();
    console.log('Product to be select is ' + productToBuy);
    this.viewProductDetails(productToBuy);
  }

  async returnProductNumber(): Promise<number> {
    // Read and parse the CSV file containing product number to buy
    const records = parse(
      fs.readFileSync(path.join(this.currentDataDirectory, this.inputFile), 'utf-8'),
      {
        columns: true,
        skip_empty_lines: true,
      }
    );

    if (records.length === 0) {
      throw new Error('CSV file is empty or missing the required data.');
    }

    // Extract the last product from the parsed records
    const selectedProduct: string | undefined = records[records.length - 1]?.ProductToSelect;
    if (!selectedProduct) {
      throw new Error('ProductToSelect field is missing or empty.');
    }

    const productNumber = parseInt(selectedProduct, 10);
    if (isNaN(productNumber)) {
      throw new Error(`Invalid number format: ${selectedProduct}`);
    }
    return productNumber;
  }

  async viewProductDetails(productToBuy: number): Promise<void> {
    // Ensure productToBuy is a valid index (1-based -> 0-based adjustment)
    if (productToBuy < 1) {
      throw new Error(`Invalid product index: ${productToBuy}. Must be 1 or higher.`);
    }

    // Get the number of available products
    const productCount = await this.productList.count();
    if (productToBuy > productCount) {
      throw new Error(
        `Product index ${productToBuy} is out of range. Only ${productCount} products available.`
      );
    }

    // Click on the desired product (adjusted to 0-based index)
    await this.productList
      .nth(productToBuy - 1)
      .locator(this.viewProductOffset)
      .click();
  }
}
