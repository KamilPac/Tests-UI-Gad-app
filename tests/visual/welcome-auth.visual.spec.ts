import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { WelcomePage } from '../pages/WelcomePage';
import { generateUser } from '../utils/userFactory';
import { DEFAULT_PASSWORD } from '../fixtures/testData';
import { snapshot } from '../utils/visual';

// Visual baseline for authenticated welcome page
// Run with --update-snapshots to record

test.describe('Visual - Welcome page (auth)', () => {
  test('welcome page snapshot after login', async ({ page }) => {
    const user = generateUser(DEFAULT_PASSWORD);
    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const welcome = new WelcomePage(page);

    // Register new user
    await home.goto();
    await home.openMenu();
    await home.goToRegister();
    await register.fillFirstName(user.firstName);
    await register.fillLastName(user.lastName);
    await register.fillEmail(user.email);
    await register.pickBirthDay('1');
    await register.fillPassword(user.password);
    await register.submit();

    // Login and land on welcome
    await login.login(user.email, user.password);

    // Ensure welcome is ready, then snapshot with masks for dynamic content
    await snapshot(page, {
      name: 'welcome-auth.png',
      masks: [
        page.getByText(/Hi\s+/i),
        page.getByText(/Session will expire/i),
        page.getByRole('img'),
      ],
    });
  });
});
