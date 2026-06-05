import { PremierResponse } from "@/shared/types/api.types";

export const getFilmPremieres = async (): Promise<PremierResponse> => {
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
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/premieres?year=${year}&month=${month}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate },
      },
    );
    if (!response.ok) return { items: [], total: 0 };
    return await response.json();
  } catch {
    return { items: [], total: 0 };
  }
};
