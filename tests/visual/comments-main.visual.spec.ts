import { test } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';
import { HomePage } from '../pages/HomePage';
import { snapshot } from '../utils/visual';

// Visual baseline: run with --update-snapshots to record

test.describe('Visual - Comments page (from main)', () => {
  test('comments page snapshot from main nav', async ({ page }) => {
    await page.goto(ROUTES.home);
    const home = new HomePage(page);
    await home.start();
    await home.openComments();
    await snapshot(page, { name: 'comments-page.png' });
  });
});
