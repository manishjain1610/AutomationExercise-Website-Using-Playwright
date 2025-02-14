export class Config {
  private static config = {
    baseUrl: process.env.BASE_URL || 'https://automationexercise.com/',
    timeout: {
      global: 30000,
      element: 5000,
    },
    browser: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS === 'true' || false,
    viewport: {
      width: 1280,
      height: 720,
    },
    screenshot: {
      onFailure: true,
      path: './test-results/screenshots',
    },
    video: {
      onFailure: true,
      path: './test-results/videos',
    },
    report: {
      allure: {
        resultsDir: './allure-results',
      },
    },
  };

  static get(): typeof Config.config {
    return this.config;
  }

  static getBaseUrl(): string {
    return this.config.baseUrl;
  }

  static getBrowser(): string {
    return this.config.browser;
  }

  static isHeadless(): boolean {
    return this.config.headless;
  }

  static getViewport() {
    return this.config.viewport;
  }

  static getTimeout() {
    return this.config.timeout;
  }

  static getScreenshotConfig() {
    return this.config.screenshot;
  }

  static getVideoConfig() {
    return this.config.video;
  }

  static getAllureConfig() {
    return this.config.report.allure;
  }
}
