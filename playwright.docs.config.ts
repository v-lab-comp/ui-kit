import { defineConfig, devices } from '@playwright/test'

/**
 * E2E против локального VitePress (`npm run docs:dev` → обычно http://127.0.0.1:5173).
 * Не поднимает сервер сам — сначала запустите доки в отдельном терминале.
 *
 * Запуск: `npm run test:e2e:docs`
 */
export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/docs-site-home.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
