import { PremierResponse } from "@/shared/types/api.types";
import dayjs from "dayjs";

export const getFilmPremieres = async (): Promise<PremierResponse> => {
  const now = dayjs();
  const year = now.year();
  const month = now.format("MMMM");
  const revalidate = 60 * 60 * 12;

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
