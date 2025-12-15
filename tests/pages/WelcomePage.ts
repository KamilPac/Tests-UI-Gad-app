import { Page, expect } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';
import { ROLES, TESTIDS } from '../fixtures/selectors';

export class WelcomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(ROUTES.welcome);
    await expect(this.page.getByRole(ROLES.myProfileButton.role as any, { name: ROLES.myProfileButton.name })).toBeVisible();
  }

  async openMyProfile() {
    await this.page.getByRole(ROLES.myProfileButton.role as any, { name: ROLES.myProfileButton.name }).click();
  }

  async openMyArticles() {
    await this.page.getByRole(ROLES.myArticlesButton.role as any, { name: ROLES.myArticlesButton.name }).click();
  }

  async openMyComments() {
    await this.page.getByRole(ROLES.myCommentsButton.role as any, { name: ROLES.myCommentsButton.name }).click();
  }

  async openSurveys() {
    await this.page.getByRole(ROLES.surveysButton.role as any, { name: ROLES.surveysButton.name }).click();
  }

  async deleteAccountOnce() {
    await this.page.getByTestId(TESTIDS.deleteButton).click();
  }

  async deleteAccountWithDialogDismiss() {
    this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
    await this.page.getByTestId(TESTIDS.deleteButton).click();
  }

  async deleteAccountWithDialogAccept() {
    this.page.once('dialog', dialog => dialog.accept().catch(() => {}));
    await this.page.getByTestId(TESTIDS.deleteButton).click();
  }

  async expectNoResults() {
    await expect(this.page.getByTestId(TESTIDS.noResults)).toContainText('No data');
  }

  async openMyArticlesAndExpectNoResults() {
    await this.openMyArticles();
    await this.expectNoResults();
  }

  async openMyCommentsAndExpectNoResults() {
    await this.openMyComments();
    await this.expectNoResults();
  }
}
