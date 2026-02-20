/**
 * Приклад 1: Моніторинг мережевих запитів і відповідей
 *
 * page.on('request') та page.on('response') — обробники подій,
 * що викликаються для кожного HTTP-запиту та відповіді.
 *
 * Корисно для: налагодження, аналіз мережевої активності сторінки.
 */

import { test, expect } from '@playwright/test';

test.describe('Моніторинг запитів та відповідей', () => {
  test('логуються всі запити й відповіді при переході на сторінку', async ({
    page,
  }) => {
    // Масиви для збору даних (для перевірки в тесті)
    const requests: string[] = [];
    const responses: { status: number; url: string }[] = [];

    // Підписка на подію 'request' — викликається ПЕРЕД відправкою запиту
    page.on('request', (request) => {
      requests.push(`${request.method()} ${request.url()}`);
    });

    // Підписка на подію 'response' — викликається ПІСЛЯ отримання відповіді
    page.on('response', (response) => {
      responses.push({ status: response.status(), url: response.url() });
    });

    // Виконуємо перехід — це викличе багато запитів (document, images, scripts тощо)
    await page.goto('https://example.com');

    // Перевірки: мають бути запити та відповіді
    expect(requests.length).toBeGreaterThan(0);
    expect(responses.length).toBeGreaterThan(0);

    // Головний документ має бути серед запитів
    const mainDocRequest = requests.find((r) =>
      r.includes('https://example.com')
    );
    expect(mainDocRequest).toBeDefined();

    // Відповідь на головну сторінку має статус 200
    const mainResponse = responses.find((r) =>
      r.url.includes('example.com') && !r.url.includes('www.')
    );
    expect(mainResponse?.status).toBe(200);
  });
});
