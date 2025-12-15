import { test, expect } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';

// Visual baseline: run with --update-snapshots to record

test.describe('Visual - Welcome page', () => {
  test('welcome page snapshot', async ({ page }) => {
    await page.goto(ROUTES.welcome);
    // Some environments may redirect unauthenticated users to login.
    // Ensure page is settled before snapshot.
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('welcome.png', { fullPage: true });
  });
});
