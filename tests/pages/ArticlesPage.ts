import { Page, Locator } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';

export class ArticlesPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ROUTES.articles);
    await this.page.getByTestId('search-input').waitFor({ state: 'visible' });
  }

  async getArticleCount() {
    return await this.page.locator('[data-testid^="article-"][data-testid*="-link"]').count();
  }

  async getArticleByIndex(index: number): Promise<Locator> {
    return this.page.locator('[data-testid^="article-"][data-testid*="-link"]').nth(index);
  }

  async clickArticle(index: number) {
    const article = await this.getArticleByIndex(index);
    await article.waitFor({ state: 'visible' });
    await article.click();
  }

  async getArticleTitle(index: number) {
    const article = await this.getArticleByIndex(index);
    // Article link might contain child elements with text
    const child = article.locator('span, h3, h2, h1, div').first();
    const text = await child.innerText().catch(() => '');
    if (text) return text;
    
    // Fallback to parent text
    return await article.innerText().catch(() => '');
  }

  async getArticleAuthor(index: number) {
    const article = await this.getArticleByIndex(index);
    const parent = article.locator('..');
    return await parent.locator('[class*="author"], span').nth(1).textContent().catch(() => null);
  }

  async getComments() {
    return this.page.locator('[data-testid*="comment"]');
  }

  async clickComments() {
    const commentButtons = this.page.locator('[data-testid*="comment"]');
    const count = await commentButtons.count();
    if (count > 0) {
      await commentButtons.first().click();
    }
  }

  async searchArticles(query: string) {
    await this.page.locator('[data-testid="search-input"]').fill(query);
    await this.page.locator('[data-testid="search-button"]').click();
  }

  async nextPage() {
    await this.page.locator('[data-testid="next-button"]').click();
  }
}
