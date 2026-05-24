# Architecture Plan — Kinopoisk-like Movie App

**Stack:** Next.js 16 · Axios · TanStack Query v5 · Shadcn · TypeScript

---

## Folder Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx                # Header + Footer
│   │   ├── page.tsx                  # Главная (топ фильмов, подборки)
│   │   ├── movies/
│   │   │   ├── page.tsx              # Каталог фильмов с фильтрами
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Страница фильма
│   │   ├── series/
│   │   │   ├── page.tsx              # Каталог сериалов
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Страница сериала
│   │   ├── person/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Страница актёра / режиссёра
│   │   ├── genre/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Фильмы по жанру
│   │   ├── collections/
│   │   │   ├── page.tsx              # Подборки
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Конкретная подборка
│   │   └── profile/
│   │       ├── page.tsx              # Профиль пользователя
│   │       ├── watchlist/page.tsx    # Хочу посмотреть
│   │       ├── watched/page.tsx      # Уже смотрел
│   │       └── favorites/page.tsx    # Избранное
│   ├── globals.css
│   └── layout.tsx                    # Root layout (провайдеры)
│
├── entities/
│   ├── movie/
│   │   ├── api/movie.api.ts          # getMovies, getMovie, getTopMovies
│   │   ├── hooks/
│   │   │   ├── useMovie.ts
│   │   │   ├── useMovies.ts
│   │   │   └── useTopMovies.ts
│   │   ├── model/movie.types.ts      # Movie, MovieDetails, Genre, Rating
│   │   └── ui/
│   │       ├── MovieCard.tsx         # Карточка в каталоге
│   │       ├── MovieHero.tsx         # Баннер на странице фильма
│   │       ├── MovieRating.tsx       # Блок с рейтингом (IMDb, КП)
│   │       └── MovieTrailer.tsx      # Встроенный трейлер
│   ├── person/
│   │   ├── api/person.api.ts         # getPerson, getPersonMovies
│   │   ├── hooks/usePerson.ts
│   │   ├── model/person.types.ts     # Person, Role (actor/director/...)
│   │   └── ui/
│   │       ├── PersonCard.tsx        # Карточка актёра
│   │       └── PersonAvatar.tsx
│   ├── review/
│   │   ├── api/review.api.ts         # getReviews, createReview
│   │   ├── hooks/
│   │   │   ├── useReviews.ts
│   │   │   └── useCreateReview.ts
│   │   ├── model/review.types.ts     # Review, ReviewStatus
│   │   └── ui/
│   │       ├── ReviewCard.tsx
│   │       └── ReviewStats.tsx       # Соотношение положительных/негативных
│   └── user/
│       ├── api/user.api.ts           # getProfile, updateProfile
│       ├── hooks/useProfile.ts
│       ├── model/user.types.ts       # User, WatchlistItem
│       └── ui/
│           ├── UserAvatar.tsx
│           └── UserMenu.tsx
│
├── features/
│   ├── search-movies/
│   │   ├── hooks/useMovieSearch.ts   # useQuery с debounce
│   │   └── ui/
│   │       ├── SearchInput.tsx
│   │       └── SearchDropdown.tsx    # Быстрые результаты под строкой
│   ├── filter-movies/
│   │   ├── model/filters.types.ts    # MovieFilters (genre, year, rating...)
│   │   └── ui/
│   │       ├── FilterPanel.tsx
│   │       └── ActiveFilters.tsx     # Теги активных фильтров
│   ├── rate-movie/
│   │   ├── hooks/useRateMovie.ts     # useMutation
│   │   └── ui/StarRating.tsx
│   ├── toggle-watchlist/
│   │   ├── hooks/useToggleWatchlist.ts
│   │   └── ui/WatchlistButton.tsx
│   └── auth/
│       ├── hooks/
│       │   ├── useLogin.ts
│       │   └── useRegister.ts
│       └── ui/
│           ├── LoginForm.tsx
│           └── RegisterForm.tsx
│
├── widgets/
│   ├── Header/
│   │   └── index.tsx                 # Лого + поиск + меню пользователя
│   ├── Footer/
│   │   └── index.tsx
│   ├── MovieCatalog/
│   │   └── index.tsx                 # Фильтры + сетка карточек + пагинация
│   ├── MoviePageInfo/
│   │   └── index.tsx                 # Hero + рейтинг + описание + трейлер
│   ├── CastSection/
│   │   └── index.tsx                 # Горизонтальный скролл актёров
│   ├── ReviewSection/
│   │   └── index.tsx                 # Список отзывов + форма
│   ├── SimilarMovies/
│   │   └── index.tsx                 # Горизонтальный скролл похожих
│   └── TopMoviesSection/
│       └── index.tsx                 # Блок топа на главной
│
├── shared/
│   ├── api/
│   │   ├── axios.instance.ts         # baseURL, auth interceptor, error interceptor
│   │   └── query-keys.ts             # Фабрики ключей
│   ├── lib/
│   │   ├── utils.ts                  # cn(), formatDate(), formatRuntime()
│   │   └── debounce.ts
│   ├── types/
│   │   └── api.types.ts              # ApiResponse<T>, PaginatedResponse<T>
│   └── ui/                           # shadcn-компоненты
│       ├── button.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── skeleton.tsx              # Скелетоны для загрузки
│       └── ...
│
└── providers/
    └── query-provider.tsx
```

---

## Key Conventions

### `shared/api/axios.instance.ts`

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      // редирект на логин
    }
    return Promise.reject(error)
  },
)
```

### `shared/api/query-keys.ts`

```ts
export const movieKeys = {
  all: ['movies'] as const,
  list: (filters: MovieFilters) => [...movieKeys.all, 'list', filters] as const,
  detail: (id: number) => [...movieKeys.all, 'detail', id] as const,
  top: () => [...movieKeys.all, 'top'] as const,
}

export const personKeys = {
  all: ['persons'] as const,
  detail: (id: number) => [...personKeys.all, 'detail', id] as const,
}

export const reviewKeys = {
  byMovie: (movieId: number) => ['reviews', movieId] as const,
}
```

### `entities/movie/model/movie.types.ts`

```ts
export interface Movie {
  id: number
  title: string
  originalTitle: string
  poster: string
  year: number
  genres: Genre[]
  rating: { kp: number; imdb: number }
  duration: number           // минуты
}

export interface MovieDetails extends Movie {
  description: string
  trailer: string
  cast: Person[]
  director: Person
  similar: Movie[]
}

export interface Genre {
  id: number
  name: string
  slug: string
}
```

### `shared/types/api.types.ts`

```ts
export interface ApiResponse<T> {
  data: T
  success: boolean
  message: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
```

---

## Layer Rules

| Слой | Может импортировать |
|------|---------------------|
| `app/` | widgets, features, entities, shared |
| `widgets/` | features, entities, shared |
| `features/` | entities, shared |
| `entities/` | shared |
| `shared/` | ничего из выше |

---

## Path Aliases

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
