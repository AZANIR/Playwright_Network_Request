/**
 * Модуль 03: API-тестування з Playwright
 * Приклад: PUT, PATCH, DELETE
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 03 — API PUT/PATCH/DELETE', () => {
  test('PUT оновити пост', async ({ request }) => {
    const response = await request.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        data: {
          id: 1,
          title: 'Updated',
          body: 'Updated body',
          userId: 1,
        },
      }
    );
    expect(response.ok()).toBe(true);
  });

  test('PATCH часткове оновлення', async ({ request }) => {
    const response = await request.patch(
      'https://jsonplaceholder.typicode.com/posts/1',
      { data: { title: 'Patched' } }
    );
    expect(response.ok()).toBe(true);
  });

  test('DELETE', async ({ request }) => {
    const response = await request.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response.ok()).toBe(true);
  });
});
