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

export type StaffType =
  | "WRITER"
  | "OPERATOR"
  | "EDITOR"
  | "COMPOSER"
  | "PRODUCER_USSR"
  | "TRANSLATOR"
  | "DIRECTOR"
  | "DESIGN"
  | "PRODUCER"
  | "ACTOR"
  | "VOICE_DIRECTOR"
  | "UNKNOWN ";

export type Staff = {
  staffId: number;
  nameRu: string | null;
  nameEn: string | null;
  description: string | null;
  posterUrl: string;
  professionText: string;
  professionKey: StaffType;
};

export type ReviewsType = "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "UNKNOWN";

export type Reviews = {
  kinopoiskId: number;
  type: ReviewsType;
  date: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  title: string | null;
  description: string;
};

export type ReviewOrder =
  | "DATE_ASC"
  | "DATE_DESC"
  | "USER_POSITIVE_RATING_ASC"
  | "USER_POSITIVE_RATING_DESC"
  | "USER_NEGATIVE_RATING_ASC"
  | "USER_NEGATIVE_RATING_DESC";

export type ReviewResponse = {
  total: number;
  totalPages: number;
  totalPositiveReviews: number;
  totalNegativeReviews: number;
  totalNeutralReviews: number;
  items: Reviews[];
};

export type ExternalSource = {
  url: string;
  platform: string;
  logoUrl: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  title: string | null;
  description: string;
};

export type ExternalSourceType = {
  total: number;
  items: ExternalSource[];
};

export type SimilarFilm = {
  filmId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: "SIMILAR";
};

export type SimilarFilmResponse = {
  total: number;
  items: SimilarFilm[];
};
