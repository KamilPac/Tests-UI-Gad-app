import { Page, expect } from '@playwright/test';

export type SnapshotOptions = {
  name: string;
  masks?: Array<ReturnType<Page['locator']>>;
  fullPage?: boolean;
  maxDiffPixels?: number;
  maskColor?: string;
};

export function getCommonMasks(page: Page) {
  const header = page.locator('header');
  const nav = page.locator('nav');
  const footer = page.locator('footer');
  return [header, nav, footer];
}

export async function snapshot(page: Page, opts: SnapshotOptions) {
  const { name, masks = [], fullPage = true, maxDiffPixels = 300, maskColor = '#cccccc' } = opts;
  const common = getCommonMasks(page);
  const allMasks = [...common, ...masks];
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot(name, {
    fullPage,
    mask: allMasks,
    maskColor,
    maxDiffPixels,
  });
}
