import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 400_000,
  expect: { timeout:60000 },
  fullyParallel: false,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright',{outputFolder:'allure-results'}]
  ],
  use: {
     headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 100000,
    navigationTimeout: 60000,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ]
});
