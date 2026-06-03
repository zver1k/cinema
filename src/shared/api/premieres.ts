import { PremierResponse } from "@/shared/types/api.types";

export const getFilmPremieres = async () => {
  const date = new Date();
  const firstDayOfNextMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1,
  );
  const revalidate = Math.floor(
    (firstDayOfNextMonth.getTime() - date.getTime()) / 1000,
  );
  const year = date.getFullYear().toString();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/premieres?year=${year}&month=${month}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate },
    },
  );
  if (data.status === 402) return { items: [], total: 0 };
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: PremierResponse = await data.json();
  return response;
};
