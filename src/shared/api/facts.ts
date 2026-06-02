import { FilmFactsResponse } from "@/shared/types/api.types";

export const getFilmFacts = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}/facts`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  if (data.status === 404) return [];
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmFactsResponse = await data.json();
  return response.items;
};
