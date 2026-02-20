/**
 * Приклад 3: DELETE та валідація відповіді
 *
 * Перевірка структури JSON, статусів, response.ok().
 */

import { test, expect } from '@playwright/test';

test.describe('DELETE та валідація', () => {
  test('DELETE — видалення ресурсу', async ({ request }) => {
    const response = await request.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    // JSONPlaceholder повертає 200 для DELETE (фейковий API)
    expect(response.ok()).toBe(true);
  });

  test('перевірка структури JSON відповіді', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    expect(response.ok()).toBe(true);

    const user = await response.json();

    // Валідація очікуваної структури
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user.address).toHaveProperty('street');
    expect(user.address).toHaveProperty('city');
  });
});
