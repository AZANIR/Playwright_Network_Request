/**
 * Модуль 03: API-тестування з Playwright
 * Приклад: GET та POST запити (фікстура request)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 03 — API GET/POST', () => {
  test('GET список постів', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(response.ok()).toBe(true);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test('POST створити пост', async ({ request }) => {
    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: { title: 'Test', body: 'Body', userId: 1 },
      }
    );
    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created.title).toBe('Test');
  });
});
