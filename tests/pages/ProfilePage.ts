import { Page, expect } from '@playwright/test';
import { TESTIDS, ROLES } from '../fixtures/selectors';

export class ProfilePage {
  constructor(private page: Page) {}

  async expectFirstName(name: string) {
    await expect(this.page.getByTestId(TESTIDS.firstname)).toContainText(name);
  }

  async expectLastName(name: string) {
    await expect(this.page.getByTestId(TESTIDS.lastname)).toContainText(name);
  }

  async revealEmail() {
    await this.page.locator('i.fas.fa-edit.emailEdit').click();
  }

  async expectEmail(value: string) {
    await expect(this.page.getByTestId(TESTIDS.emailInput)).toHaveValue(value);
  }

  async dblClickUpdateEmail() {
    await this.page.getByTestId(TESTIDS.updateEmail).dblclick();
  }

  async downloadUserCsv() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole(ROLES.downloadCsvButton.role as any, { name: ROLES.downloadCsvButton.name }).click();
    await downloadPromise;
  }
}
