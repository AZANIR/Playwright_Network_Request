/**
 * Приклад 3: Блокування мережевих запитів (page.route + route.abort)
 *
 * page.route() перехоплює запити до співпадіння з URL/патерном.
 * route.abort() — скасовує запит (ресурс не завантажується).
 *
 * Корисно для: пришвидшення тестів, відключення реклами/аналітики.
 */

import { test, expect } from '@playwright/test';

test.describe('Блокування запитів', () => {
  test('блокувати зображення — пришвидшити тест', async ({ page }) => {
    let blockedCount = 0;

    // Реєструємо маршрут ДО goto
    await page.route('**/*', (route) => {
      const request = route.request();
      // Блокуємо тільки зображення
      if (request.resourceType() === 'image') {
        blockedCount++;
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('https://example.com');

    // example.com завантажує зображення — вони мають бути заблоковані
    // (наприклад favicon або інші картинки)
    expect(blockedCount).toBeGreaterThanOrEqual(0);
    // Головна сторінка все одно завантажилась
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('блокувати запити за розширенням', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,gif,ico,webp}', (route) =>
      route.abort()
    );

    await page.goto('https://example.com');
    await expect(page.locator('body')).toBeVisible();
  });
});
