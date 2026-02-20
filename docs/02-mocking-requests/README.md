# Модуль 02: Мокування мережевих запитів у Playwright

![Мокінг мережевих запитів](../src/mocking.png)

## Що таке мокування і навіщо воно потрібно

**Мокування (mocking)** — заміна справжньої відповіді сервера на штучну, задану в тесті. Браузер і фронтенд отримують підготовлені дані замість реальних.

**Навіщо мокати:**

- не залежати від бекенду та зовнішніх сервісів;
- перевіряти рідкісні сценарії (помилки, порожні дані);
- пришвидшити тести;
- тестувати стабільно — без збоїв мережі.

---

## Механізм: page.route + route.fulfill

В Playwright мокування будується на `page.route()` та `route.fulfill()`.

**route.fulfill()** — повертає браузеру відповідь, задану в тесті, без відправки запиту на сервер.

**Важливо:** кожен перехоплений запит має отримати або `route.continue()`, або `route.fulfill()`. Інакше запит зависне.

**Порядок:** зареєструвати `page.route` **до** `page.goto()` або дії, що викликає запит.

---

## Простий мок

```javascript
await page.route('**/api/login', (route) =>
  route.fulfill({
    status: 200,
    body: 'accept',
  })
);
await page.goto('https://example.com');
```

---

## Мок JSON-відповіді

```javascript
await page.route('**/api/users', (route) =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ id: 1, name: 'Test User' }),
  })
);
```

Або через опцію `json` (Playwright встановить Content-Type автоматично):

```javascript
await page.route('**/api/users', (route) =>
  route.fulfill({
    status: 200,
    json: { id: 1, name: 'Test User' },
  })
);
```

---

## Мок на основі оригіналу (route.fetch)

Якщо потрібно взяти справжню відповідь і трохи змінити її:

```javascript
await page.route('**/api/data', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  json.extraField = 'added';
  await route.fulfill({ response, json });
});
```

---

## Поширені помилки

1. **Route після goto** — маршрут не спрацює для вже відправлених запитів.
2. **Забути fulfill або continue** — запит зависне.
3. **Неправильний Content-Type** — для JSON краще використовувати `json` у `fulfill`.

---

## Приклади коду

Дивіться папку [examples/](./examples/) — робочі приклади з коментарями.
