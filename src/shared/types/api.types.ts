export type Premier = {
  kinopoiskId: number;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  year: number;
  countries: string[];
  duration: number;
  premiereRu: string;
};

export type PremierResponse = {
  total: number;
  items: Premier[];
};
