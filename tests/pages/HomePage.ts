import { Page, expect } from '@playwright/test';
import { ROUTES } from '../fixtures/testData';
import { TESTIDS, ROLES } from '../fixtures/selectors';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(ROUTES.home);
    await expect(this.page.getByTestId(TESTIDS.dropdownButton)).toBeVisible();
  }

  async openMenu() {
    await this.page.getByTestId(TESTIDS.dropdownButton).click();
  }

  async goToRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async start() {
    await this.page.getByRole('button', { name: "Let's start!" }).click();
  }

  async openComments() {
    await this.page.getByTestId(TESTIDS.openComments).waitFor({ state: 'visible' });
    await this.page.getByTestId(TESTIDS.openComments).click();
  }

  async goToRegisterFromMenu() {
    await this.openMenu();
    await this.goToRegister();
  }
}
