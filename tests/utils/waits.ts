import { Page, Locator, expect } from '@playwright/test';

export async function waitForVisible(locator: Locator, timeout = 10_000) {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForUrl(page: Page, pattern: string, timeout = 10_000) {
  await page.waitForURL(pattern, { timeout });
}

export async function expectVisible(locator: Locator, timeout = 10_000) {
  await expect(locator).toBeVisible({ timeout });
}
