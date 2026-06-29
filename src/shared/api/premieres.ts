import { PremierResponse } from "@/shared/types/api.types";
import dayjs from "dayjs";

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

function monthParams(d: dayjs.Dayjs) {
  return { year: d.year(), month: MONTHS[d.month()] };
}

async function fetchMonth(
  year: number,
  month: string,
): Promise<PremierResponse> {
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
}

export const getFilmPremieres = async (): Promise<PremierResponse> => {
  const now = dayjs();
  const next = now.add(1, "month");

  const cur = monthParams(now);
  const nxt = monthParams(next);

  const [a, b] = await Promise.all([
    fetchMonth(cur.year, cur.month),
    fetchMonth(nxt.year, nxt.month),
  ]);

  return { items: [...a.items, ...b.items], total: a.total + b.total };
};
