import { SimilarFilmResponse } from "@/shared/types/api.types";

export const getSimilarById = async (
  id: string,
): Promise<SimilarFilmResponse> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}/similars`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok) return { items: [], total: 0 };
    return await response.json();
  } catch {
    return { items: [], total: 0 };
  }
};
