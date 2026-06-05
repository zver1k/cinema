import { BoxOfficeResponse } from "@/shared/types/api.types";

export const getBoxOffice = async (id: string): Promise<BoxOfficeResponse> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}/box_office`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok) return { total: 0, items: [] };
    return await response.json();
  } catch {
    return { total: 0, items: [] };
  }
};
