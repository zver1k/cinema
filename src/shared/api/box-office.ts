import { BoxOfficeResponse } from "@/shared/types/api.types";

export const getBoxOffice = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}/box_office`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: BoxOfficeResponse = await data.json();
  return response.items;
};
