# REST API Mage Digital CMS — инструкция для фронтенда

Краткий справочник: доступ, эндпоинты, структура ответов, populate динамических зон и готовые примеры кода.
Стенд: **https://stage.magedigital.srv08.ru** (Strapi 5.54.0). Контент-модель: 3 коллекции,
7 single types, 24 компонента (15 секций, 4 карточки, 5 служебных) — поля каждого типа в [§ 4](#4-контент-модель).

## 1. Доступ

### 1.1. Сайт и API — один origin

Фронтенд и CMS обслуживаются одним доменом (nginx):

| Путь | Что там |
| --- | --- |
| `/` | статика SPA (fallback на `index.html`) |
| `/api/...` | REST API контента |
| `/uploads/...` | медиафайлы |
| `/admin` | админка Strapi |
| `/_health` | health-check → `204 No Content` |

Следствие: **базовый URL — относительный**. `fetch('/api/clients')` и `src="/uploads/x.jpg"`
работают и на stage, и на проде; CORS не задействован, запрос идёт на тот же origin.

```js
// src/config/api.js
export const API_ORIGIN = import.meta.env?.VITE_API_ORIGIN ?? '';   // '' => тот же origin
export const API_BASE = `${API_ORIGIN}/api`;
export const mediaUrl = (file, size) => {
  if (!file) return null;
  const rel = size && file.formats?.[size] ? file.formats[size].url : file.url;
  return `${API_ORIGIN}${rel}`;
};
```

Абсолютный `API_ORIGIN` нужен только для локальной разработки или SSG-сборки на другом хосте.

### 1.2. Авторизация

**Public-роль на чтение всех 10 типов открыта автоматически** — сид (`SEED=true`, `src/index.ts`)
выдаёт роли Public `find`/`findOne` при каждом запуске с сидированием. Анонимный GET работает
без заголовков; HTTP-кэш и CDN работают без секретов.

| Случай | Что делать |
| --- | --- |
| Обычное чтение опубликованного контента | без токена (Public-роль) |
| Черновики (`?status=draft`) | read-only API-токен: `Authorization: Bearer <token>` |
| Токен невалидный/устаревший (например, БД пересоздавали) | `401 Missing or invalid credentials` — выпустить новый (Settings → API Tokens) |
| `403` | права Public отозваны — вернуть `find`/`findOne` в Settings → Roles → Public |

```js
const TOKEN = import.meta.env?.VITE_STRAPI_TOKEN;   // токен только на BFF/в env, не в бандле
const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
```

---

## 2. Эндпоинты

Single types доступны по `singularName` (`/api/menu`, а не `/api/menus`).

| Эндпоинт | Тип | Publish | Что отдаёт |
| --- | --- | --- | --- |
| `GET /api/clients` | коллекция | да | клиенты: `name`, `logo` (vector), `url` |
| `GET /api/services` | коллекция | да | услуги: `title`, `subtitle`, `text`, `image`, `items` (кнопки) |
| `GET /api/members` | коллекция | да | команда: `name`, `position`, `mission`, `photo` |
| `GET /api/home-page` | single | да | главная: 10 секций |
| `GET /api/services-page` | single | да | страница услуг: 5 секций |
| `GET /api/about-page` | single | да | страница «О нас»: 7 секций |
| `GET /api/site-setting` | single | нет | лого, описание, контакты, ссылки подвала |
| `GET /api/menu` | single | нет | пункты меню (`label`/`url`/`target`) |
| `GET /api/cookie-banner` | single | нет | текст и кнопка cookie-баннера |
| `GET /api/contacts-section` | single | нет | блок контактов: тексты формы + теги |

Коллекции поддерживают `filters`, `sort`, `pagination`, `fields`, `populate`, `status`.
Запросы с неизвестными параметрами дают `400` — в `config/api.ts` включён `rest.strictParams`.

---

## 3. Структура ответов

### 3.1. Конверт `{ data, meta }`

Коллекция — `data` это **массив**; single type — `data` это **объект**:

```json
{ "data": [ { "id": 5, "documentId": "b1qs0ndnpd5fnbr9x9v2iqix", "name": "Aviasales",
              "url": "https://aviasales.ru" } ],
  "meta": { "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "total": 6 } } }
```

```json
{ "data": { "id": 1, "documentId": "pl7gm39s0fjcyv06l7x9bdk4", "items": [ ] }, "meta": {} }
```

| Правило | Пояснение |
| --- | --- |
| Ключи и кэш — `documentId` | строка, стабильна между окружениями и черновиком/публикацией; числовой `id` меняется |
| `meta.pagination` | у коллекций есть всегда; у single types `meta: {}` — норма |
| Связи, медиа, компоненты | объект/массив/`null`; **отсутствующий ключ = populate не запрошен**, а не пустое значение |
| `__component` | имя секции в dynamic zone (`sections.hero`, `sections.stats`, …) |

### 3.2. Порядок гарантирован

- **Секции** страниц возвращаются в том порядке, в котором расставлены в админке (dynamic zone);
  фронтенд рендерит их подряд по массиву, ветвясь по `__component`.
- **Связи секций** (`sections.clients.clients`, `sections.services.services`, `sections.team.members`)
  возвращаются в порядке, заданном в админке (в join-таблице есть колонка сортировки) —
  не пересортировывайте их на клиенте.
- Повторяемые компоненты (`stats`, `solutions`, `steps`, `items`, `tags`, …) — в порядке админки.

---

## 4. Контент-модель

### 4.1. Страницы — динамические зоны

Все три страницы (`home-page`, `services-page`, `about-page`) имеют одно поле `sections`
(dynamic zone) и различаются только составом секций:

| Страница | Секции по порядку |
| --- | --- |
| `home-page` | `hero`, `video`, `text`, `clients`, `stats`, `solutions`, `text`, `advantages`, `text`, `text` |
| `services-page` | `hero`, `services`, `collab`, `process`, `text` |
| `about-page` | `hero`, `mage`, `history`, `team`, `text`, `principles`, `text` |

### 4.2. Секции (components/sections)

| Секция | Поля |
| --- | --- |
| `sections.hero` | `title`, `subtitle`, `image` (media), `button` |
| `sections.video` | `title`, `subtitle`, `button`, `video` (shared.video: файл/ссылка/постер/флаги) |
| `sections.text` | `title`, `subtitle`, `button` |
| `sections.clients` | `title`, `subtitle`, `button`, `clients` — связь → `api::client` |
| `sections.stats` | `title`, `subtitle`, `button`, `stats` — repeatable `shared.stat-item` |
| `sections.solutions` | `title`, `subtitle`, `button`, `solutions` — repeatable `cards.rich-card` |
| `sections.advantages` | `title`, `subtitle`, `button`, `advantages` — repeatable `cards.short-card` |
| `sections.services` | `title`, `subtitle`, `button`, `services` — связь → `api::service` |
| `sections.collab` | `title`, `subtitle`, `text`, `button`, `collabs` — repeatable `cards.icon-card` |
| `sections.process` | `title`, `subtitle`, `button`, `steps` — repeatable `cards.short-card` |
| `sections.mage` | `title`, `subtitle`, `button`, `steps` — repeatable `cards.logo-card` |
| `sections.history` | `title`, `subtitle`, `button`, `thenTitle`, `nowTitle`, `thenPhotos`/`nowPhotos` — repeatable `shared.photo` |
| `sections.team` | `title`, `subtitle`, `button`, `members` — связь → `api::member` |
| `sections.principles` | `title`, `subtitle`, `button`, `principles` — repeatable `cards.short-card` |
| `sections.contacts` | форма контактов: 12 текстовых полей + `tags` (repeatable `shared.tag`); вне страниц — в single type `contacts-section` (`content`) |

У каждой секции `title`/`subtitle` опциональны; `button` — компонент `shared.button`
(`label`, `url`, `target`: `_self` | `_blank`).

### 4.3. Карточки (components/cards) и служебные (components/shared)

| Компонент | Поля |
| --- | --- |
| `cards.short-card` | `title`, `text` |
| `cards.rich-card` | `title`, `text`, `button`, `image` (media) |
| `cards.logo-card` | `title`, `logo` (vector), `text`, `icon` (vector) |
| `cards.icon-card` | `title`, `logo` (vector), `text` |
| `shared.button` | `label`, `url`, `target` (`_self`/`_blank`) |
| `shared.stat-item` | `value`, `label` |
| `shared.tag` | `code`, `label`, `color` |
| `shared.vector` | `title`, `slug` (uid), `svgCode` (inline SVG), `svgFile` (media) |
| `shared.video` | `video` (media), `source` (ссылка на видео-сервис), `poster` (media), `autoplay`, `muted`, `loop` |
| `shared.photo` | `image` (media) |

### 4.4. Коллекции и single types

| Тип | Поля |
| --- | --- |
| `client` | `name`, `logo` (vector), `url` |
| `service` | `title`, `subtitle`, `text`, `image` (media), `items` (repeatable `shared.button` — подуслуги-ссылки) |
| `member` | `name`, `position`, `mission`, `photo` (media) |
| `site-setting` | `url`, `logo` (vector), `title`, `description`, `image`, `email`, `phone`, `address`, `copyright`, `privacyPolicyUrl`, `accreditationUrl`, `mageClubChannelUrl` |
| `menu` | `items` — repeatable `shared.button` |
| `cookie-banner` | `text`, `buttonLabel` |
| `contacts-section` | `content` — компонент `sections.contacts` |

Коллекции и три страницы — с Draft & Publish: неопубликованное в API не попадает
(пустой `data`/отсутствие секции = «не опубликовано», см. [§ 10](#10-коды-ответов)).

---

## 5. Запросы к страницам (dynamic zone)

Секции и их вложенные поля приходят только при явном `populate`. Шаблон на каждый
компонент dynamic zone:

```
populate[sections][on][<uid>][populate][<поле>]=true
```

- связь (`clients`, `services`, `members`) — обычный populate: `…[populate][clients]=true`;
- repeatable-компонент без вложенных (`stats`, `advantages`, `steps`, `principles`) — `…[populate][stats]=true`;
- компонент с медиа внутри (`solutions` → `cards.rich-card.image`; `collabs` и `mage.steps` → `shared.vector.svgFile`;
  `history` → `shared.photo.image`; `video` → `shared.video.video|poster`) —
  на уровень глубже: `…[populate][solutions][populate][image]=true`.

Готовые запросы (все поля всех секций, совместимы с `strictParams`; тот же набор
использует `bash scripts/fetch-home-api.sh`):

```bash
B=https://stage.magedigital.srv08.ru

curl -g "$B/api/home-page?populate[sections][on][sections.hero][populate][image]=true" \
  "&populate[sections][on][sections.hero][populate][button]=true" \
  "&populate[sections][on][sections.video][populate][button]=true" \
  "&populate[sections][on][sections.video][populate][video][populate][video]=true" \
  "&populate[sections][on][sections.video][populate][video][populate][poster]=true" \
  "&populate[sections][on][sections.text][populate][button]=true" \
  "&populate[sections][on][sections.clients][populate][button]=true" \
  "&populate[sections][on][sections.clients][populate][clients]=true" \
  "&populate[sections][on][sections.stats][populate][button]=true" \
  "&populate[sections][on][sections.stats][populate][stats]=true" \
  "&populate[sections][on][sections.solutions][populate][button]=true" \
  "&populate[sections][on][sections.solutions][populate][solutions][populate][button]=true" \
  "&populate[sections][on][sections.solutions][populate][solutions][populate][image]=true" \
  "&populate[sections][on][sections.advantages][populate][button]=true" \
  "&populate[sections][on][sections.advantages][populate][advantages]=true"
```

Для `services-page` добавить ветки `sections.services` (`services`), `sections.collab`
(`collabs[populate][logo][populate][svgFile]`), `sections.process` (`steps`);
для `about-page` — `sections.mage` (`steps[populate][logo|icon][populate][svgFile]`),
`sections.history` (`thenPhotos|nowPhotos[populate][image]`), `sections.team` (`members`),
`sections.principles` (`principles`).

Коллекции и служебные single types:

```bash
curl -g "$B/api/clients?populate[logo][populate][svgFile]=true&sort[0]=name:asc&pagination[pageSize]=100"
curl -g "$B/api/services?populate[image]=true&populate[items]=true&sort[0]=title:asc&pagination[pageSize]=100"
curl -g "$B/api/members?populate[photo]=true&sort[0]=name:asc&pagination[pageSize]=100"
curl -g "$B/api/site-setting?populate[logo][populate][svgFile]=true&populate[image]=true"
curl -g "$B/api/menu?populate[items]=true"
curl -g "$B/api/contacts-section?populate[content][populate][tags]=true"
curl    "$B/api/cookie-banner"
```

Проверка всех запросов разом: `bash scripts/fetch-home-api.sh --base-url $B --strict`.

---

## 6. Пример кода

```js
// src/api/strapi.js
const get = async (path) => {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`);
  const { data } = await res.json();
  return data;
};

export const loadHome = () => get('/home-page?populate[sections][on][sections.hero][populate][image]=true' +
  '&populate[sections][on][sections.hero][populate][button]=true' +
  '&populate[sections][on][sections.clients][populate][clients]=true'); // … и т.д. по § 5

// рендер dynamic zone
const DynamicZone = ({ sections }) =>
  sections?.map((s, i) => {
    switch (s.__component) {
      case 'sections.hero':    return <Hero key={i} {...s} />;
      case 'sections.video':   return <VideoBlock key={i} {...s} />;
      case 'sections.clients': return <Clients key={i} {...s} />;
      default:                 return null;
    }
  }) ?? null;
```

```js
// кнопка из любого места модели
const Button = ({ button }) =>
  button ? <a href={button.url} target={button.target}
              rel={button.target === '_blank' ? 'noreferrer' : undefined}>{button.label}</a>
         : null;

// vector: приоритет — загруженный файл, иначе inline-код (санитайзить!)
const Vector = ({ vector }) =>
  vector?.svgFile ? <img src={mediaUrl(vector.svgFile)} alt={vector.title ?? ''} />
  : vector?.svgCode ? <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vector.svgCode) }} />
  : null;
```

---

## 7. Медиа и векторы

- Медиа-объект: `{ url, alternativeText, width, height, mime, formats: { large, medium, small, thumbnail } }`;
  `url` относительный (`/uploads/...`) — подставлять `API_ORIGIN`; превью брать из `formats`.
- `shared.vector`: либо `svgFile` (SVG из Media Library), либо `svgCode` (inline-строка).
  Seed заполняет `svgCode`; рендерить только через санитайзер (DOMPurify).
- Seed не заполняет растровые медиа: `hero.image`, `service.image`, `member.photo`,
  `cards.rich-card.image`, `shared.video.video|poster` — `null`, пока редактор не загрузит файлы.

---

## 8. TypeScript

```ts
export interface SharedButton { label: string; url: string; target: '_self' | '_blank'; }
export interface MediaFile { url: string; alternativeText: string | null; width: number;
  height: number; mime: string; formats?: Record<string, { url: string }>; }
export interface ShortCard { title: string; text: string | null; }
export interface RichCard { title: string; text: string | null; button: SharedButton | null; image: MediaFile | null; }

export type Section =
  | { __component: 'sections.hero'; title: string | null; subtitle: string | null;
      image: MediaFile | null; button: SharedButton | null }
  | { __component: 'sections.video'; title: string | null; subtitle: string | null;
      button: SharedButton | null; video: SharedVideo | null }
  | { __component: 'sections.text'; title: string | null; subtitle: string | null; button: SharedButton | null }
  | { __component: 'sections.clients'; title: string | null; subtitle: string | null;
      button: SharedButton | null; clients: Client[] }
  | { __component: 'sections.services'; title: string | null; subtitle: string | null;
      button: SharedButton | null; services: Service[] }
  | { __component: 'sections.team'; title: string | null; subtitle: string | null;
      button: SharedButton | null; members: Member[] }
  | { __component: 'sections.stats'; title: string | null; subtitle: string | null;
      button: SharedButton | null; stats: { value: string; label: string }[] }
  | { __component: 'sections.advantages' | 'sections.process' | 'sections.principles';
      title: string | null; subtitle: string | null; button: SharedButton | null;
      advantages?: ShortCard[]; steps?: ShortCard[]; principles?: ShortCard[] }
  | { __component: 'sections.solutions'; title: string | null; subtitle: string | null;
      button: SharedButton | null; solutions: RichCard[] }
  | { __component: 'sections.collab'; title: string | null; subtitle: string | null;
      text: string | null; button: SharedButton | null; collabs: IconCard[] }
  | { __component: 'sections.mage'; title: string | null; subtitle: string | null;
      button: SharedButton | null; steps: LogoCard[] }
  | { __component: 'sections.history'; title: string | null; subtitle: string | null;
      button: SharedButton | null; thenTitle: string | null; nowTitle: string | null;
      thenPhotos: { image: MediaFile | null }[]; nowPhotos: { image: MediaFile | null }[] };
```

---

## 9. Коды ответов

| Код | Причина | Что делать |
| --- | --- | --- |
| `200` | OK | — |
| `400` | `ValidationError: Invalid key …` — неизвестный query-параметр или опечатка в `populate` (`strictParams`) | сверить имена полей с § 4–5 |
| `401` | `UnauthorizedError` — токен отсутствует/протух (при запросе с токеном) | выпустить новый токен |
| `403` | `ForbiddenError` — Public-роль без `find`/`findOne`; `status=draft` без прав | вернуть права роли (сид делает это сам при `SEED=true`) |
| `404` | `NotFoundError` — неверный путь (забыт `singularName`) или нет опубликованной версии | сверить путь; проверить Publish в админке |
| `500` | ошибка на стороне Strapi | логи `docker logs mage-cms` |

Помнить: `404` ≠ «нет прав» (за права отвечает `403`). Проверка руками:

```bash
curl -g 'https://stage.magedigital.srv08.ru/api/site-setting'
bash scripts/fetch-home-api.sh --base-url https://stage.magedigital.srv08.ru --strict
```

---

## 10. Что учесть в вёрстке (срез после пересидирования)

| Где пусто | Как компенсировать |
| --- | --- |
| Растровые медиа: `hero.image`, `service.image`, `member.photo`, `rich-card.image`, `video.video|poster` | плейсхолдер для всех изображений/видео |
| `shared.vector.svgFile` | использовать `svgCode` (+ DOMPurify) |
| `client.url` | логотип/название без ссылки |
| `button` в секциях опционален | рендер через `?.`, пустые блоки не выводить |
| `title`/`subtitle` секций опциональны | заголовок не рендерить, если `null` |
| Состав секций может меняться редактором | dynamic zone — switch по `__component` с default-веткой |

---

## 11. Чеклист интеграции

1. `API_ORIGIN` — относительный (`''`) на сайте; абсолютный — только для локальной разработки/SSG.
2. Доступ: анонимно (Public-роль открыта сидом); токен — только для черновиков и хранится вне бандла.
3. Каркас: `site-setting` + `menu` + `cookie-banner` — кешировать отдельно от страниц.
4. Страница = один GET с deep-populate по всем секциям (§ 5) + `DynamicZone` по `__component`.
5. Ключи списков — `documentId`; секции — `__component` + индекс.
6. Порядок секций и связей брать как есть из ответа (§ 3.2).
7. `svgCode` — через DOMPurify; медиа — через `mediaUrl` с фолбэком-плейсхолдером.
8. Ошибки `403/404` логировать: `404` — неверный путь single type, `403` — слетели права Public.
9. HTTP-кэш настраивать на CDN/nginx; для SSG — пересборка вебхуком из Strapi (Settings → Webhooks).




