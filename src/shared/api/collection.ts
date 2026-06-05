import { CollectionType, FilmResponse } from "@/shared/types/api.types";

export const getCollection = async (
  type: CollectionType,
  page: number = 1,
): Promise<FilmResponse> => {
  const params = new URLSearchParams();
  params.append("type", type.toString());
  params.append("page", page.toString());
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/collections?${params.toString()}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) return { items: [], total: 0, totalPages: 0 };
    return (await response.json()) as FilmResponse;
  } catch {
    return { items: [], total: 0, totalPages: 0 };
  }
};
