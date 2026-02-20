# Навчальний курс: Мережеві запити в Playwright

Комплексний навчальний модуль для курсу «Автомейшен тестери»: перехоплення, мокування та API-тестування за допомогою [Playwright](https://playwright.dev/).

## Про курс

У репозиторії:

- **Теоретичні пояснення** у `docs/` — перехоплення (page.on, waitForRequest/Response, route), мокування (route.fulfill), API-тестування (APIRequestContext).
- **Практичні приклади** у `docs/0X-.../examples/` — робочий код з коментарями українською.
- **Готові Playwright-тести** у `examples/test-frameworks/playwright/tests/`.
- **Презентації** у `prezentations/` — теоретичний матеріал для лекцій.

## Готові робочі приклади

У `examples/test-frameworks/playwright/` розміщено Playwright-проєкт:

- Всі тести працюють з **JSONPlaceholder** та **example.com**.
- Коментарі українською, структура за модулями 01–03.
- Запуск: `npm install && npm run test` або `npm run test:ui`.

## Зміст курсу

### Модуль 01: Перехоплення запитів

![Перехоплення мережевих запитів](./docs/src/intercepting.png)

Моніторинг запитів і відповідей, `page.on`, `waitForRequest`, `waitForResponse`, `page.route`, блокування ресурсів.

📁 [Документація](./docs/01-intercepting-requests/) | [Приклади](./docs/01-intercepting-requests/examples/) | [Тести](./examples/test-frameworks/playwright/tests/01-intercepting/) | [Презентація](./prezentations/01_Intercepting_requests.md)

---

### Модуль 02: Мокування запитів

![Мокінг мережевих запитів](./docs/src/mocking.png)

Підміна відповідей через `route.fulfill`, мок на основі оригіналу (`route.fetch`), імітація помилок (4xx, 5xx).

📁 [Документація](./docs/02-mocking-requests/) | [Приклади](./docs/02-mocking-requests/examples/) | [Тести](./examples/test-frameworks/playwright/tests/02-mocking/) | [Презентація](./prezentations/02_Mocking_requests.md)

---

### Модуль 03: API-тестування з Playwright

![API-тестування в Playwright](./docs/src/apitesting.png)

`APIRequestContext`, фікстура `request`, методи GET, POST, PUT, PATCH, DELETE, валідація відповідей.

📁 [Документація](./docs/03-api-testing-playwright/) | [Приклади](./docs/03-api-testing-playwright/examples/) | [Тести](./examples/test-frameworks/playwright/tests/03-api-testing/) | [Презентація](./prezentations/03_Api_testing_playwright.md)

---

## Швидкий старт

### Передумови

- **Node.js** >= 18
- **npm** >= 9

### Встановлення та запуск

```bash
cd examples/test-frameworks/playwright
npm install
npm run test
```

### Запуск за модулями

```bash
npm run test:module1   # 01 — Перехоплення
npm run test:module2   # 02 — Мокування
npm run test:module3   # 03 — API-тестування
```

### UI mode

```bash
npm run test:ui
```

### Звіти

```bash
npm run report
```

## Структура проекту

```
Playwright_Network_Request/
├── docs/                              # Документація модулів
│   ├── 01-intercepting-requests/
│   │   ├── README.md
│   │   └── examples/
│   ├── 02-mocking-requests/
│   │   ├── README.md
│   │   └── examples/
│   └── 03-api-testing-playwright/
│       ├── README.md
│       └── examples/
├── examples/test-frameworks/playwright/
│   ├── tests/
│   │   ├── 01-intercepting/
│   │   ├── 02-mocking/
│   │   └── 03-api-testing/
│   ├── package.json
│   └── playwright.config.ts
├── prezentations/                     # Презентації
├── README.md
├── LICENSE
└── .gitignore
```

## Як використовувати курс

1. **Встановіть** проект згідно з «Швидкий старт».
2. **Вивчайте модулі по черзі** 01 → 02 → 03.
3. **Читайте** `docs/0X-.../README.md`, переглядайте `examples/` і запускайте відповідні тести.
4. **Переглядайте** презентації в `prezentations/`.

## Технічні деталі

- **Node.js** >= 18, **Playwright** ^1.49, **npm** >= 9.
- **Тестовий API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
- **Приклади сторінок:** [example.com](https://example.com).

## Типові помилки

- **route:** реєструйте `page.route` **до** дії, що викликає запит.
- **waitForRequest/waitForResponse:** promise створюйте **до** дії, `await` — **після**.
- **API:** для query string використовуйте `params`, для тіла — `data`.

## Для кого курс

- Студенти курсів з автоматизованого тестування.
- QA-інженери, які використовують Playwright і хочуть глибше працювати з мережею та API.

## Додаткові ресурси

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## Ліцензія

MIT — див. [LICENSE](./LICENSE).
