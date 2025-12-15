import { test } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';
import { HomePage } from '../pages/HomePage';
import { snapshot } from '../utils/visual';

// Visual baseline: run with --update-snapshots to record

test.describe('Visual - Home page', () => {
  test('home page snapshot', async ({ page }) => {
    await page.goto(ROUTES.home);
    const home = new HomePage(page);
    await home.goto();
    await snapshot(page, { name: 'home.png' });
  });
});
