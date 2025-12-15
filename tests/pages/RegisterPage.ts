import { Page, expect } from '@playwright/test';
import { TESTIDS, ROLES } from '../fixtures/selectors';

export class RegisterPage {
  constructor(private page: Page) {}

  async fillFirstName(value: string) {
    await this.page.getByTestId(TESTIDS.firstnameInput).fill(value);
  }

  async fillLastName(value: string) {
    await this.page.getByTestId(TESTIDS.lastnameInput).fill(value);
  }

  async fillEmail(value: string) {
    await this.page.getByTestId(TESTIDS.emailInput).fill(value);
  }

  async pickBirthDay(day: string = '1') {
    await this.page.getByTestId(TESTIDS.birthdateInput).click();
    await this.page.getByRole('link', { name: day, exact: true }).click();
  }

  async fillPassword(value: string) {
    await this.page.getByTestId(TESTIDS.passwordInput).fill(value);
  }

  async submit() {
    await Promise.all([
      this.page.waitForURL('**/login*', { timeout: 10_000 }).catch(() => {}),
      this.page.getByTestId(TESTIDS.registerButton).click(),
    ]);
    // Ensure login form is ready (email input visible)
    await this.page.getByRole(ROLES.loginEmailTextbox.role as any, { name: ROLES.loginEmailTextbox.name }).waitFor({ state: 'visible', timeout: 10_000 });
  }

  async register(user: { firstName: string; lastName: string; email: string; password: string; birthDay?: string }) {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.pickBirthDay(user.birthDay ?? '1');
    await this.fillPassword(user.password);
    await this.submit();
  }
}
