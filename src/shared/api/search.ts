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
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.1/films/search-by-keyword?${params.toString()}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return { items: [], totalPages: 0 };
    const json: FilmSearchResponse = await response.json();
    return {
      items: json.films.map((f) => ({
        kinopoiskId: f.filmId,
        posterUrl: f.posterUrl,
        posterUrlPreview: f.posterUrlPreview,
        nameRu: f.nameRu,
        nameEn: f.nameEn,
        nameOriginal: null,
        ratingKinopoisk: parseFloat(f.rating) || null,
        genres: f.genres,
        year: f.year,
      })),
      totalPages: json.pagesCount,
    };
  } catch {
    return { items: [], totalPages: 0 };
  }
};
