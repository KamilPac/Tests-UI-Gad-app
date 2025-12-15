import { test } from '@playwright/test';

test('debug - check page structure', async ({ page }) => {
  await page.goto('/articles.html');
  // Wait for an element that signals content is ready
  await page.locator('article, [data-testid^="article-"][data-testid*="-link"], main, section').first().waitFor({ state: 'visible' });
  
  console.log('\n=== PAGE STRUCTURE ===');
  
  // Check all possible containers
  const articles = await page.locator('article').count();
  console.log('1. Articles found:', articles);
  
  const divArticles = await page.locator('[class*="article"]').count();
  console.log('2. Divs with "article" class:', divArticles);
  
  const divPosts = await page.locator('[class*="post"]').count();
  console.log('3. Divs with "post" class:', divPosts);
  
  const main = await page.locator('main').count();
  console.log('4. Main elements:', main);
  
  const section = await page.locator('section').count();
  console.log('5. Section elements:', section);
  
  const allDivs = await page.locator('div').count();
  console.log('6. Total divs:', allDivs);
  
  // Get full page content
  const htmlContent = await page.content();
  console.log('\n=== FULL HTML ===');
  console.log(htmlContent);
  
  // Take screenshot
  await page.screenshot({ path: 'debug-screenshot.png' });
  console.log('\nScreenshot saved');
});
