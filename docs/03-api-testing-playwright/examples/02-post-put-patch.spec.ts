/**
 * Приклад 2: POST, PUT, PATCH — створення та оновлення ресурсів
 *
 * JSONPlaceholder — фейковий API: приймає запити і повертає симульовані відповіді.
 * Реально на сервері нічого не змінюється, але формат відповіді коректний.
 */

import { test, expect } from '@playwright/test';

test.describe('POST, PUT, PATCH запити', () => {
  test('POST — створити новий пост', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'Test body content',
      userId: 1,
    };

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: newPost,
      }
    );

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created.title).toBe(newPost.title);
    expect(created.body).toBe(newPost.body);
    expect(created.id).toBeDefined();
  });

  test('PUT — повна заміна ресурсу', async ({ request }) => {
    const response = await request.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        data: {
          id: 1,
          title: 'Updated Title',
          body: 'Updated body',
          userId: 1,
        },
      }
    );

    expect(response.ok()).toBe(true);
    const updated = await response.json();
    expect(updated.title).toBe('Updated Title');
  });

  test('PATCH — часткове оновлення', async ({ request }) => {
    const response = await request.patch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        data: { title: 'Patched Title' },
      }
    );

    expect(response.ok()).toBe(true);
    const patched = await response.json();
    expect(patched.title).toBe('Patched Title');
  });
});
