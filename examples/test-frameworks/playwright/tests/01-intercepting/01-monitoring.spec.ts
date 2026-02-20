/**
 * Модуль 01: Перехоплення запитів
 * Приклад: Моніторинг мережевих запитів та відповідей (page.on)
 */

import { test, expect } from '@playwright/test';

test.describe('Модуль 01 — Моніторинг запитів', () => {
  test('всі запити та відповіді логуються при goto', async ({ page }) => {
    const requests: string[] = [];
    const responses: { status: number }[] = [];

    page.on('request', (req) => {
      requests.push(`${req.method()} ${req.url()}`);
    });

    page.on('response', (res) => {
      responses.push({ status: res.status() });
    });

    await page.goto('https://example.com');

    expect(requests.length).toBeGreaterThan(0);
    expect(responses.length).toBeGreaterThan(0);
    const mainResponse = responses.find((r) => r.status === 200);
    expect(mainResponse).toBeDefined();
  });
});
