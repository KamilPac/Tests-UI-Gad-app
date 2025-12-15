import { Page, expect } from '@playwright/test';
import { ROLES } from '../fixtures/selectors';

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByRole(ROLES.loginEmailTextbox.role as any, { name: ROLES.loginEmailTextbox.name }).fill(email);
    await this.page.getByRole(ROLES.loginPasswordTextbox.role as any, { name: ROLES.loginPasswordTextbox.name }).fill(password);
    await this.page.getByRole(ROLES.loginButton.role as any, { name: ROLES.loginButton.name }).click();
    await this.waitForWelcome();
  }

  async waitForWelcome() {
    await this.page.waitForURL('**/welcome');
    await expect(this.page.getByRole(ROLES.myProfileButton.role as any, { name: ROLES.myProfileButton.name })).toBeVisible();
  }

  async loginExpectFailure(email: string, password: string) {
    await this.page.getByRole(ROLES.loginEmailTextbox.role as any, { name: ROLES.loginEmailTextbox.name }).waitFor({ state: 'visible' });
    await this.page.getByRole(ROLES.loginEmailTextbox.role as any, { name: ROLES.loginEmailTextbox.name }).fill(email);
    await this.page.getByRole(ROLES.loginPasswordTextbox.role as any, { name: ROLES.loginPasswordTextbox.name }).fill(password);
    await this.page.getByRole(ROLES.loginButton.role as any, { name: ROLES.loginButton.name }).click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).not.toHaveURL('**/welcome');
    await expect(this.page.getByRole(ROLES.loginButton.role as any, { name: ROLES.loginButton.name })).toBeVisible();
    await expect(this.page.getByText(/Invalid username or password/i)).toBeVisible();
  }
}
