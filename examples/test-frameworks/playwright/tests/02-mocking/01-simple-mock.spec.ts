/**
 * Модуль 02: Мокування запитів
 * Приклад: Простий мок (route.fulfill)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 02 — Простий мок', () => {
  test('мок JSON відповіді', async ({ page }) => {
    const mockData = {
      id: 999,
      title: 'Мокований пост',
      body: 'Мокований контент',
    };

    await page.route('**/posts/1', (route) =>
      route.fulfill({
        status: 200,
        json: mockData,
      })
    );

    const response = await page.goto(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const json = await response!.json();
    expect(json.title).toBe('Мокований пост');
    expect(json.id).toBe(999);
  });
});
