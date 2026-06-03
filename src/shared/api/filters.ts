import { FilterResponse } from "@/shared/types/api.types";

export const getFilters = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/filters`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 2592000 },
    },
  );
  if (data.status === 402) return { genres: [], countries: [] };
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilterResponse = await data.json();
  return response;
};
