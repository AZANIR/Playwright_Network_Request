/**
 * Модуль 01: Перехоплення запитів
 * Приклад: Блокування ресурсів (page.route + route.abort)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 01 — Блокування запитів', () => {
  test('блокувати зображення', async ({ page }) => {
    await page.route('**/*', (route) => {
      if (route.request().resourceType() === 'image') {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });
});
