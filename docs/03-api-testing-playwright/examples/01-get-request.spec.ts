/**
 * Приклад 1: GET-запити з APIRequestContext (фікстура request)
 *
 * Використовуємо JSONPlaceholder — безкоштовний тестовий API.
 * baseURL задається в playwright.config.ts
 */

import { test, expect } from '@playwright/test';

test.describe('GET API запити', () => {
  test('отримати список постів', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
  });

  test('отримати один пост з query params', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.ok()).toBe(true);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBeDefined();
    expect(post.title).toBeDefined();
  });
});
