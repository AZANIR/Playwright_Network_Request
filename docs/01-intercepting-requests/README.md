# Модуль 01: Перехоплення мережевих запитів у Playwright

![Перехоплення мережевих запитів](../src/intercepting.png)

## Що таке мережеві запити і навіщо їх перехоплювати?

**Мережевий запит (HTTP request)** — це повідомлення, яке браузер відправляє на сервер при відкритті сторінки, натисканні кнопки, завантаженні зображень тощо. **Відповідь (response)** — це те, що сервер повертає.

**Перехоплення (interception)** — можливість «підслухати» або змінити обмін без доступу до реального сервера. Playwright дозволяє:

- **спостерігати** за запитами й відповідями (лог, аналіз);
- **чекати** на конкретний запит/відповідь (синхронізація з UI);
- **змінювати** або **блокувати** запити.

---

## Методи Playwright для роботи з мережею

| Задача | Метод |
|--------|--------|
| Спостерігати за всіма запитами/відповідями | `page.on('request', ...)` / `page.on('response', ...)` |
| Дочекатися конкретного запиту | `page.waitForRequest(...)` |
| Дочекатися відповіді | `page.waitForResponse(...)` |
| Змінити запит перед відправкою | `page.route(..., route => route.continue({...}))` |
| Повністю блокувати запити | `page.route(..., route => route.abort())` |

---

## 1. Моніторинг запитів і відповідей

**page.on('request')** і **page.on('response')** — обробники подій для кожного запиту й відповіді.

```javascript
page.on('request', request => console.log('>>', request.method(), request.url()));
page.on('response', response => console.log('<<', response.status(), response.url()));
```

---

## 2. waitForRequest

**Важливо:** спочатку запускаємо очікування (без await), потім виконуємо дію, потім await на promise.

```javascript
// 1. Почати слухати (БЕЗ await!)
const requestPromise = page.waitForRequest('**/api/resource');
// 2. Виконати дію
await page.getByText('Load').click();
// 3. Дочекатися запиту
const request = await requestPromise;
```

---

## 3. waitForResponse

Синхронізація з відповіддю сервера — UI часто оновлюється саме після неї.

```javascript
const responsePromise = page.waitForResponse('**/api/data');
await page.getByText('Update').click();
const response = await responsePromise;
```

Підтримуються: рядок URL, glob-патерн (`**/api/**`), RegExp.

---

## 4. page.route — модифікація та блокування

Реєструємо обробник для URL. У ньому обов'язково викликати `route.continue()` або `route.fulfill()` / `route.abort()`.

**Модифікація заголовків:**
```javascript
await page.route('**/*', route => {
  const headers = { ...route.request().headers() };
  delete headers['X-Secret'];
  route.continue({ headers });
});
```

**Блокування ресурсів:**
```javascript
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
```

---

## Поширені помилки

1. **Неправильний порядок await** — `waitForRequest`/`waitForResponse` запускають ДО дії.
2. **Забути `route.continue()` або `route.fulfill()`** — запит зависне.
3. **Route після goto** — налаштовуйте `page.route` ДО `page.goto()`.

---

## Приклади коду

Дивіться папку [examples/](./examples/) — робочі приклади з коментарями українською.
