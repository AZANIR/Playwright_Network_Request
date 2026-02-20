/**
 * Модуль 01: Перехоплення запитів
 * Приклад: Очікування відповіді (waitForResponse)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 01 — waitForResponse', () => {
  test('дочекатися відповіді API', async ({ page }) => {
    const responsePromise = page.waitForResponse(
      (res) =>
        res.url().includes('jsonplaceholder.typicode.com') && res.ok()
    );

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');

    const response = await responsePromise;
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json).toHaveProperty('id', 1);
  });
});
