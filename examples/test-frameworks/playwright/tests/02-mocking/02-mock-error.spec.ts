/**
 * Модуль 02: Мокування запитів
 * Приклад: Мок помилок (404, 500)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 02 — Мок помилок', () => {
  test('мок 404', async ({ page }) => {
    await page.route('**/posts/99999', (route) =>
      route.fulfill({ status: 404, json: { message: 'Not found' } })
    );

    const response = await page.goto(
      'https://jsonplaceholder.typicode.com/posts/99999'
    );
    expect(response?.status()).toBe(404);
  });
});
