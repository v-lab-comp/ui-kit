import { test, expect } from '@playwright/test'

test.describe('Storybook (smoke + LanguageSwitcher)', () => {
  test('главная Storybook открывается', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Storybook/i, { timeout: 30_000 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('LanguageSwitcher Playground: в списке «Русский» целиком, ширина списка достаточна', async ({
    page,
  }) => {
    await page.goto('/?path=/story/components-languageswitcher--playground', {
      waitUntil: 'domcontentloaded',
    })
    const preview = page.frameLocator('iframe#storybook-preview-iframe')
    const combobox = preview.getByRole('combobox', { name: 'Язык интерфейса' }).first()
    await expect(combobox).toBeVisible({ timeout: 45_000 })
    await combobox.click()
    // Портал Floating UI в body iframe превью (не в top-level page)
    const option = preview.getByRole('option', { name: 'Русский' })
    await expect(option).toBeVisible()
    const opBox = await option.boundingBox()
    expect(opBox).toBeTruthy()
    expect(opBox!.width, 'строка не должна быть в колонку из 4 букв').toBeGreaterThan(56)
    const listbox = preview.getByRole('listbox').first()
    if ((await listbox.count()) > 0) {
      const lb = await listbox.boundingBox()
      expect(lb?.width, 'выпадение не уже ~триггера').toBeGreaterThan(80)
    }
  })
})
