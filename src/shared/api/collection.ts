import { CollectionType, FilmResponse } from "@/shared/types/api.types";

export const getCollection = async (type: CollectionType, page: number = 1) => {
  const params = new URLSearchParams();
  params.append("type", type.toString());
  params.append("page", page.toString());

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/collections?${params.toString()}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 86400 },
    },
  );
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmResponse = await data.json();
  return response;
};
