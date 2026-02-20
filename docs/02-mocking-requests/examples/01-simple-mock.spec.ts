/**
 * Приклад 1: Простий мок відповіді (route.fulfill)
 *
 * Замінюємо реальну відповідь API на фіксовані дані.
 * Важливо: page.route реєструємо ДО page.goto або дії, що викликає запит.
 */

import { test, expect } from '@playwright/test';

test.describe('Простий мок відповіді', () => {
  test('мок JSON API — повертаємо власні дані', async ({ page }) => {
    const mockData = {
      userId: 1,
      id: 999,
      title: 'Мокований заголовок',
      body: 'Мокований текст посту',
    };

    // Реєструємо мок ДО запиту
    await page.route('**/jsonplaceholder.typicode.com/posts/1', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      })
    );

    // Переходимо на URL, що відповідає нашому патерну
    const response = await page.goto(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response?.ok()).toBe(true);
    const json = await response!.json();
    expect(json.title).toBe('Мокований заголовок');
    expect(json.id).toBe(999);
  });

  test('мок через опцію json', async ({ page }) => {
    await page.route('**/posts/2', (route) =>
      route.fulfill({
        status: 200,
        json: { id: 2, title: 'Custom Title', body: 'Custom body' },
      })
    );

    await page.goto('https://jsonplaceholder.typicode.com/posts/2');
    const content = await page.content();
    expect(content).toContain('Custom Title');
  });
});
