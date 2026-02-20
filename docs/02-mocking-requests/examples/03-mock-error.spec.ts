/**
 * Приклад 3: Мок помилкових відповідей (4xx, 5xx)
 *
 * Імітуємо помилки сервера для перевірки обробки помилок у UI.
 */

import { test, expect } from '@playwright/test';

test.describe('Мок помилкових відповідей', () => {
  test('мок 404 Not Found', async ({ page }) => {
    await page.route('**/posts/99999', (route) =>
      route.fulfill({
        status: 404,
        json: { message: 'Post not found' },
      })
    );

    const response = await page.goto(
      'https://jsonplaceholder.typicode.com/posts/99999'
    );
    expect(response?.status()).toBe(404);
    const json = await response!.json();
    expect(json.message).toBe('Post not found');
  });

  test('мок 500 Internal Server Error', async ({ page }) => {
    await page.route('**/posts/1', (route) =>
      route.fulfill({
        status: 500,
        body: 'Internal Server Error',
      })
    );

    const response = await page.goto(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response?.status()).toBe(500);
  });
});
