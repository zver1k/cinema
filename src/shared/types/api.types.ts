export type Premier = {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  year: number;
  countries: { country: string }[];
  genres: { genre: string }[];
  duration: number | null;
  premiereRu: string;
};

export type PremierResponse = {
  total: number;
  items: Premier[];
};

export type Genre = {
  id: number;
  genre: string;
};

export type Country = {
  id: number;
  country: string;
};

export type FilterResponse = {
  genres: Genre[];
  countries: Country[];
};

export type FilmType =
  | "FILM"
  | "TV_SHOW"
  | "VIDEO"
  | "MINI_SERIES"
  | "TV_SERIES"
  | "UNKNOWN";

export type CollectionType =
  | "TOP_POPULAR_ALL"
  | "TOP_POPULAR_MOVIES"
  | "TOP_250_TV_SHOWS"
  | "TOP_250_MOVIES"
  | "VAMPIRE_THEME"
  | "COMICS_THEME"
  | "CLOSES_RELEASES"
  | "FAMILY"
  | "OSKAR_WINNERS_2021"
  | "LOVE_THEME"
  | "ZOMBIE_THEME"
  | "CATASTROPHE_THEME"
  | "KIDS_ANIMATION_THEME"
  | "POPULAR_SERIES";

export type CollectionResponse = FilmResponse;

export type Film = {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: { country: string }[];
  genres: { genre: string }[];
  ratingKinopoisk: number | null;
  ratingImbd: number | null;
  year: string | null;
  type: FilmType;
  posterUrl: string;
  posterUrlPreview: string;
};

export type FilmResponse = {
  total: number;
  totalPages: number;
  items: Film[];
};

export type FilmDetail = {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  posterUrl: string;
  ratingKinopoisk: number | null;
  description: string | null;
  filmLength: number | null;
  genres: { genre: string }[];
  countries: { country: string }[];
  slogan: string | null;
  year: number | null;
};
