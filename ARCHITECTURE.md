# Architecture — Cinema Vision (Next.js)

**Stack:** Next.js · Axios · TanStack Query v5 · shadcn/ui (Radix UI) · Tailwind CSS · TypeScript · Manrope font

---

## Текущее состояние

### Реализовано

```
src/
├── app/
│   ├── layout.tsx                        # Root layout: QueryProvider + Manrope font
│   ├── globals.css
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (main)/
│       ├── page.tsx
│       ├── movies/page.tsx
│       ├── movies/[id]/page.tsx
│       ├── series/page.tsx
│       ├── series/[id]/page.tsx
│       ├── person/page.tsx
│       ├── person/[id]/page.tsx
│       └── profile/page.tsx
│
├── providers/
│   └── query-provider.tsx                # TanStack Query — подключён в layout.tsx
│
├── shared/
│   ├── api/
│   │   └── axios.instance.ts             # Один инстанс: baseURL + X-API-Key из env
│   ├── constants/
│   │   └── search.ts                     # searchData (all / films / serials / cartoon)
│   ├── lib/
│   │   └── utils.ts                      # cn()
│   ├── types/
│   │   └── api.types.ts                  # Premier, PremierResponse
│   └── ui/                               # shadcn-компоненты
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── button-group.tsx
│       ├── field.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── separator.tsx
│
└── widgets/
    ├── Header/
    │   └── index.tsx                     # SearchSelect + Search + UserNotify + UserMenu
    ├── Search/
    │   └── index.tsx                     # Input + Button (без логики)
    ├── SearchSelect/
    │   └── index.tsx                     # Select по searchData, useState
    ├── UserMenu/
    │   └── index.tsx                     # Avatar + имя (хардкод)
    └── UserNotify/
        └── index.tsx                     # Bell-иконка (заглушка)
```

### Не реализовано

- `Sidebar` — отсутствует (есть в `cinema-vision`, нужно перенести)
- `entities/` — слой не создан (movie, person, review, user)
- `features/` — слой не создан (search, filter, auth, watchlist, rate)
- Страницы — файлы есть, контент пустой
- Поиск — нет логики, только UI
- `UserMenu` — хардкод вместо данных пользователя

---

## Целевая структура (FSD)

```
src/
├── app/                                  # Next.js App Router
│   ├── (auth)/login · register
│   └── (main)/
│       ├── layout.tsx                    # Sidebar + Header
│       ├── page.tsx                      # Главная
│       ├── movies/[id]
│       ├── series/[id]
│       ├── person/[id]
│       ├── profile/
│       │   ├── watchlist/
│       │   ├── watched/
│       │   └── favorites/
│       └── collections/[slug]
│
├── entities/
│   ├── movie/   (api · hooks · model · ui)
│   ├── person/  (api · hooks · model · ui)
│   ├── review/  (api · hooks · model · ui)
│   └── user/    (api · hooks · model · ui)
│
├── features/
│   ├── search-movies/
│   ├── filter-movies/
│   ├── rate-movie/
│   ├── toggle-watchlist/
│   └── auth/
│
├── widgets/
│   ├── Header/
│   ├── Sidebar/
│   ├── Footer/
│   ├── MovieCatalog/
│   ├── MoviePageInfo/
│   ├── CastSection/
│   ├── ReviewSection/
│   ├── SimilarMovies/
│   └── TopMoviesSection/
│
├── shared/
│   ├── api/
│   │   ├── axios.instance.ts
│   │   └── query-keys.ts
│   ├── constants/
│   ├── lib/
│   ├── types/
│   └── ui/
│
└── providers/
```

---

## Правила импортов (FSD)

| Слой | Может импортировать |
|---|---|
| `app/` | widgets, features, entities, shared |
| `widgets/` | features, entities, shared |
| `features/` | entities, shared |
| `entities/` | shared |
| `shared/` | ничего из выше |

---

## API

```ts
// shared/api/axios.instance.ts
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY },
});
```

Источник данных — Kinopoisk API Unofficial. Переменные окружения: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_KEY`.

---

## Path Alias

```json
{ "paths": { "@/*": ["./src/*"] } }
```
