# Модуль 03: API-тестування з Playwright

![API-тестування в Playwright](../src/apitesting.png)

## Що таке API-тестування

**API (Application Programming Interface)** — спосіб взаємодії програм. У веб-контексті це HTTP-запити, якими клієнт отримує або надсилає дані на сервер.

**API-тестування** — перевірка роботи запитів без UI: відправляємо запити, перевіряємо статус і тіло відповіді. Швидше і стабільніше за E2E, бо не потрібен браузер.

**Переваги Playwright для API:**
- один інструмент для E2E і API;
- спільні fixtures, конфігурація;
- API можна використовувати в E2E для setup (створення даних).

---

## APIRequestContext

**APIRequestContext** — об'єкт для виконання HTTP-запитів. Інтерфейс подібний до `fetch`, з додатковими можливостями:

- `baseURL` для всіх запитів;
- вбудовані заголовки;
- методи `get`, `post`, `put`, `patch`, `delete`;
- інтеграція з cookies та `storageState`.

---

## Створення контексту

Через фікстуру `request` (вже налаштований) або через `playwright.request.newContext()`:

```javascript
// У тесті — фікстура request
test('API test', async ({ request }) => {
  const response = await request.get('/api/users');
});

// Власний контекст
const ctx = await playwright.request.newContext({
  baseURL: 'https://api.example.com',
  extraHTTPHeaders: { 'Authorization': 'Bearer TOKEN' },
});
```

---

## HTTP-методи

| Метод   | Призначення             |
|---------|-------------------------|
| GET     | Отримання даних         |
| POST    | Створення ресурсу       |
| PUT     | Повна заміна ресурсу    |
| PATCH   | Часткове оновлення      |
| DELETE  | Видалення ресурсу       |

- **params** — query string (`?key=value`) для GET.
- **data** — тіло запиту (JSON) для POST, PUT, PATCH.

---

## Приклади викликів

**GET з params:**
```javascript
await request.get('/api/items', { params: { page: 1, limit: 10 } });
```

**POST з JSON:**
```javascript
await request.post('/api/items', {
  data: { title: 'New Item', author: 'John' },
});
```

---

## Поширені помилки

1. **params vs data** — для query string використовуйте `params`, для тіла — `data`.
2. **response.json() один раз** — результат зберігайте у змінну.
3. **Не dispose контексту** — при власному контексті викликайте `dispose()` в `afterAll`.

---

## Приклади коду

Дивіться папку [examples/](./examples/).
