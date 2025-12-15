import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Increase default per-test timeout to accommodate longer E2E flow
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 10_000,
    navigationTimeout: 10_000,
    trace: 'on-first-retry',
  },
});
