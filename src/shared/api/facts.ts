import { FilmFactsResponse } from "@/shared/types/api.types";

export const getFilmFacts = async (id: string): Promise<FilmFactsResponse> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}/facts`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok) return { total: 0, items: [] };
    return (await response.json()) as FilmFactsResponse;
  } catch {
    return { total: 0, items: [] };
  }
};
