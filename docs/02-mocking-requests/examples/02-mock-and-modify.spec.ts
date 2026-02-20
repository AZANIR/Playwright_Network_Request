/**
 * Приклад 2: Мок на основі оригінальної відповіді (route.fetch)
 *
 * route.fetch() виконує реальний запит до сервера.
 * Ми отримуємо справжню відповідь, змінюємо її і повертаємо клієнту через route.fulfill().
 *
 * Корисно для: тестування UI з незначними змінами в даних.
 */

import { test, expect } from '@playwright/test';

test.describe('Мок на основі оригіналу', () => {
  test('модифікувати JSON перед поверненням', async ({ page }) => {
    await page.route('**/jsonplaceholder.typicode.com/posts/1', async (route) => {
      // 1. Отримати оригінальну відповідь
      const response = await route.fetch();
      const json = await response.json();

      // 2. Змінити дані
      json.title = '[MOCKED] ' + json.title;
      json.body = '[MOCKED BODY]';

      // 3. Повернути модифіковану відповідь
      await route.fulfill({
        response,
        json,
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');
    const content = await page.content();
    expect(content).toContain('[MOCKED]');
  });
});
