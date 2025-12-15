import { test } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';
import { ArticlesPage } from '../pages/ArticlesPage';
import { snapshot } from '../utils/visual';

// Visual baseline: run with --update-snapshots to record

test.describe('Visual - Articles page', () => {
  test('articles page snapshot', async ({ page }) => {
    await page.goto(ROUTES.articles);
    const articles = new ArticlesPage(page);
    await articles.goto();
    await snapshot(page, { name: 'articles.png' });
  });
});
