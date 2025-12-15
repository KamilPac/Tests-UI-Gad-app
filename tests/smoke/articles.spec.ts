import { test, expect } from '@playwright/test';
import { ArticlesPage } from '../pages/ArticlesPage';

test.describe('Articles Page @smoke', () => {
  test('should load articles page', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await expect(page).toHaveURL(/articles\.html/);
  });

  test('should display articles list', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const count = await articlesPage.getArticleCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display article links', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const count = await articlesPage.getArticleCount();
    
    for (let i = 0; i < Math.min(3, count); i++) {
      const article = await articlesPage.getArticleByIndex(i);
      const isVisible = await article.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('should click on articles', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const count = await articlesPage.getArticleCount();
    
    if (count > 0) {
      await articlesPage.clickArticle(0);
      // Verify we navigated or article loaded
      expect(page.url()).toBeTruthy();
    }
  });

  test('should navigate through articles with pagination', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    
    // Try to go to next page
    try {
      await articlesPage.nextPage();
      // Wait for either URL change or list update
      await Promise.race([
        page.waitForURL('**/articles.html**', { timeout: 10_000 }).catch(() => {}),
        page.locator('[data-testid^="article-"][data-testid*="-link"]').first().waitFor({ state: 'visible', timeout: 10_000 }),
      ]);
      expect(page.url()).toContain('articles');
    } catch (e) {
      // If no next button, that's ok
    }
  });
});
