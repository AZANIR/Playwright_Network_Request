/**
 * Приклад 2: Очікування конкретної відповіді (waitForResponse)
 *
 * page.waitForResponse() дозволяє дочекатися відповіді на певний URL
 * перед продовженням тесту. Важливо: promise створюємо ДО дії, await — ПІСЛЯ.
 *
 * Корисно для: синхронізації з API, перевірки що дані завантажились.
 */

import { test, expect } from '@playwright/test';

test.describe('Очікування відповіді waitForResponse', () => {
  test('дочекатися відповіді API перед перевіркою', async ({ page }) => {
    // Переходимо на сторінку, що завантажує дані з API
    // JSONPlaceholder — безкоштовний тестовий API
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    // Крок 1: Почати очікування відповіді (БЕЗ await! інакше пропустимо запит)
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('jsonplaceholder.typicode.com') && res.ok()
    );

    // Крок 2: Виконати дію, що викличе запит (goto завантажить JSON як document)
    await page.goto(apiUrl);

    // Крок 3: Дочекатися відповіді
    const response = await responsePromise;

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const json = await response.json();
    expect(json).toHaveProperty('id', 1);
    expect(json).toHaveProperty('title');
  });

  test('waitForResponse з glob-патерном', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/posts/**');

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');

    const response = await responsePromise;
    expect(response.status()).toBe(200);
  });
});
