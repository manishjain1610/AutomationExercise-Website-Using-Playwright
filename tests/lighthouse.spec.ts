import { test, expect } from '@playwright/test';
// import { playAudit } from 'playwright-lighthouse';
import Logger from '../src/utils/WinstonLogger';
import { chromium } from '@playwright/test';

test.describe('Lighthouse Performance Tests', () => {
  // Set timeout to 3 minutes
  test.setTimeout(180000);
  const thresholds: { [key: string]: any } = {
    performance: 1,
    accessibility: 70,
    'best-practices': 50,
    seo: 70,
  };

  const config = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
      formFactor: 'desktop' as 'desktop',
      screenEmulation: { disabled: true },
    },
  };

  test('Homepage performance audit', async ({}) => {
    const browser = await chromium.launch({
      headless: false,
      args: ['--remote-debugging-port=9222'],
    });

    const page = await browser.newPage();
    const playAudit = (await import('playwright-lighthouse')).playAudit;

    Logger.info('Running Lighthouse audit on homepage');

    await page.goto('https://automationexercise.com', { waitUntil: 'load' });

    const { lhr } = await playAudit({
      page,
      thresholds,
      config,
      port: 9222,
    });

    for (const category in lhr.categories) {
      const score = Math.round((lhr.categories[category]?.score || 0) * 100);
      Logger.info(`${category}: ${score}`);
      expect(score).toBeGreaterThanOrEqual(thresholds[category] || 0);
    }
  });
});
