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

export type Film = {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: { country: string }[];
  genres: { genre: string }[];
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  year: number | null;
  type: FilmType;
  posterUrl: string;
  posterUrlPreview: string;
};

export type FilmResponse = {
  total: number;
  totalPages: number;
  items: Film[];
};
