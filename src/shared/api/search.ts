import { FilmSearchResponse } from "@/shared/types/api.types";

export const getFilmsByKeyword = async ({
  keyword,
  page,
  type,
}: {
  keyword: string;
  page: number;
  type?: string;
}) => {
  const params = new URLSearchParams();
  if (type && type !== "ALL") params.append("type", type);
  params.append("keyword", keyword.toString());
  params.append("page", page.toString());
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.1/films/search-by-keyword?${params.toString()}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 3600 },
    },
  );
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmSearchResponse = await data.json();
  return {
    items: response.films.map((f) => ({
      kinopoiskId: f.filmId,
      posterUrl: f.posterUrl,
      nameRu: f.nameRu,
      nameEn: f.nameEn,
      nameOriginal: null,
      ratingKinopoisk: parseFloat(f.rating) || null,
      genres: f.genres,
      year: f.year,
    })),
    totalPages: response.pagesCount,
  };
};
