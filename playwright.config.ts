import { defineConfig, devices } from '@playwright/test'

/**
 * e2e против локального Storybook. Запуск: `npx playwright test`
 * (если Storybook уже на :6006 — перезапуска нет, см. reuseExistingServer).
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  timeout: 60_000,
  use: {
    baseURL: 'http://127.0.0.1:6006',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run storybook',
    url: 'http://127.0.0.1:6006',
    timeout: 120_000,
    reuseExistingServer: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
