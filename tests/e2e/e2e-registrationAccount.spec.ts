// renamed from e2e-new.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { WelcomePage } from '../pages/WelcomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { generateUser } from '../utils/userFactory';
import { DEFAULT_PASSWORD, ROUTES } from '../fixtures/testData';
import { step } from '../utils/logger';

test('registration account e2e @e2e', async ({ page }) => {
  const userData = generateUser(DEFAULT_PASSWORD);

  step(`Generated user data: ${userData.firstName} ${userData.lastName}, ${userData.email}`);

  const home = new HomePage(page);
  const register = new RegisterPage(page);
  const login = new LoginPage(page);
  const welcome = new WelcomePage(page);
  const profile = new ProfilePage(page);

  step('1. Navigating to home page...');
  await home.goto();
  step('2. Open menu and go to Register...');
  await home.goToRegisterFromMenu();

  step('3-8. Fill form and register...');
  await register.register({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    birthDay: '1',
  });

  step('9. Entering email for login...');
  step('10. Entering password for login...');
  step(`Logging in with: ${userData.email} / ${userData.password}`);
  step('11. Clicking LogIn button...');
  await login.login(userData.email, userData.password);

  step('12. Going to My profile...');
  await welcome.openMyProfile();
  step('13. Checking firstname...');
  await profile.expectFirstName(userData.firstName);
  step('14. Checking lastname...');
  await profile.expectLastName(userData.lastName);
  step('15. Clicking on email reveal...');
  await profile.revealEmail();
  await profile.expectEmail(userData.email);

  step('17. Double clicking update-email...');
  await profile.dblClickUpdateEmail();
  step('18. Downloading user data as CSV...');
  await profile.downloadUserCsv();

  step('16. Going to welcome page...');
  await welcome.goto();
  step('17-18. My articles → expect no data...');
  await welcome.openMyArticlesAndExpectNoResults();

  step('19. Going to welcome page...');
  await welcome.goto();
  step('20-21. My comments → expect no data...');
  await welcome.openMyCommentsAndExpectNoResults();

  step('22. Going to welcome page...');
  await welcome.goto();
  step('23. Clicking Surveys...');
  await welcome.openSurveys();
  step('24. Going to welcome page...');
  await welcome.goto();

  step('25. Attempting to delete account (1st time)...');
  await welcome.deleteAccountOnce();
  step('26. Attempting to delete account (2nd time)...');
  await welcome.deleteAccountWithDialogDismiss();
  step('27. Confirming delete account (final OK)...');
  await welcome.deleteAccountWithDialogAccept();

  step('28. Redirecting to login after deletion...');
  await expect(page).toHaveURL(/\/login\/?$/);
  step('29. Attempt to re-login after deletion (should fail)...');
  await login.loginExpectFailure(userData.email, userData.password);

  step('✅ Registration account e2e test completed successfully!');
});
