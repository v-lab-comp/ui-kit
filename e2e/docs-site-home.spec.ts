import { test, expect } from '@playwright/test'

test.describe('docs-site homepage (localhost:5173)', () => {
  test('VitePress home hero и контент видны', async ({ page }) => {
    const res = await page.goto('/', { waitUntil: 'networkidle' })
    expect(res?.ok(), 'Сервер недоступен — запустите: npm run docs:dev').toBeTruthy()

    await expect(page.locator('.VPHome')).toBeVisible()
    await expect(page.locator('.VPHero.has-image')).toBeVisible()
    await expect(page.locator('img.image-src')).toBeVisible()
    await expect(page.getByRole('heading', { name: /Developer documentation/i })).toBeVisible()
  })
})
