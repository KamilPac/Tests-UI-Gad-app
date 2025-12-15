# UI GAD App - Playwright Tests

This test suite uses Playwright with a Page Object Model (POM) for clean, maintainable end‑to‑end tests.

## Structure
- tests/pages: POM classes
  - HomePage.ts, RegisterPage.ts, LoginPage.ts, WelcomePage.ts, ProfilePage.ts, ArticlesPage.ts
- tests/e2e: end-to-end scenarios
  - e2e-registrationAccount.spec.ts (registration account journey) — tag `@e2e`
- tests/smoke: lightweight checks
  - articles.spec.ts (Articles page checks)
  - debug.spec.ts (structure + screenshot)
- playwright.config.ts: global settings (baseURL, timeouts, reporter)

## Conventions
- Prefer `getByTestId` / ARIA selectors (`getByRole`) over brittle CSS.
- Avoid `waitForTimeout()`; use targeted waits:
  - Navigation: `page.waitForURL('**/welcome')`
  - Visibility: `await locator.waitFor({ state: 'visible' })`
  - Assertions: `await expect(locator).toBeVisible()`
- Use relative paths (e.g. `/welcome`) — baseURL is set in config.

## Selectors
- Centralized in [tests/fixtures/selectors.ts](tests/fixtures/selectors.ts):
  - `TESTIDS`: shared `data-testid` strings (e.g., `dropdownButton`, `emailInput`, `deleteButton`).
  - `ROLES`: shared ARIA role+name pairs (e.g., `loginButton`, `myProfileButton`).
- Page Objects consume these constants to keep selectors DRY. When UI changes:
  - Update the relevant entry in `selectors.ts`.
  - POMs and tests automatically use the new value.

## Timeouts
- Per action: 10s (`use.actionTimeout`)
- Navigation: 10s (`use.navigationTimeout`)
- Assertions: 10s (`expect.timeout`)
- Per test: 120s (`timeout`) to allow full E2E flow without global timeouts.

## Run Commands (Windows PowerShell)
- Run all tests (headed):
```powershell
npx playwright test --headed
```
- Run a single spec:
```powershell
npx playwright test tests/e2e/e2e-registrationAccount.spec.ts --headed
```
- Debug with Inspector:
```powershell
npx playwright test tests/e2e/e2e-registrationAccount.spec.ts --debug
```
- Open the HTML report:
```powershell
npx playwright show-report
```
- Visual Test Runner:
```powershell
npm run test:ui
```

## Visual Regression
- Location: [tests/visual](tests/visual) — specs like:
  - [home.visual.spec.ts](tests/visual/home.visual.spec.ts)
  - [welcome.visual.spec.ts](tests/visual/welcome.visual.spec.ts)
  - [articles.visual.spec.ts](tests/visual/articles.visual.spec.ts)
  - [welcome-auth.visual.spec.ts](tests/visual/welcome-auth.visual.spec.ts)
  - [comments-main.visual.spec.ts](tests/visual/comments-main.visual.spec.ts)
- Baselines: created per spec under `*.spec.ts-snapshots/` (auto‑managed by Playwright).
- Record baseline snapshots:
```powershell
npx playwright test tests/visual --update-snapshots
```
- Verify against baselines (no updates):
```powershell
npx playwright test tests/visual
```
- Typical assertion:
```ts
await expect(page).toHaveScreenshot('page-name.png', { fullPage: true });
```
- Mask dynamic regions to reduce flakiness (emails, timers, avatars, headers/footers):
```ts
const email = page.getByText(/Hi\s+/i);
const timer = page.getByText(/Session will expire/i);
const avatar = page.getByRole('img');
const header = page.locator('header');
const footer = page.locator('footer');
await expect(page).toHaveScreenshot('welcome-auth.png', {
  fullPage: true,
  mask: [email, timer, avatar, header, footer],
  maskColor: '#cccccc',
  // allow tiny rendering diffs
  maxDiffPixels: 300,
});
```
- Troubleshooting:
  - Ensure the app is served at the configured baseURL.
  - Re‑record baselines after intentional UI changes.
  - Keep fonts consistent across runs; Playwright auto‑disables animations.
  - Prefer stable selectors and wait for `networkidle` before screenshots.

## Tips
- For flaky steps, enable tracing:
  - In config: `trace: 'on-first-retry'` (already set)
  - Per test: `test.use({ trace: 'on' })`
- Add `data-testid` to app elements when possible to stabilize selectors.
- Keep POM methods focused and side‑effect free; assertions live in specs unless they define page readiness.
