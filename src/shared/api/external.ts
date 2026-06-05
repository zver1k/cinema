import { ExternalSourceType } from "@/shared/types/api.types";

export const getExternalById = async (
  id: string,
): Promise<ExternalSourceType> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}/external_sources`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok) return { total: 0, items: [] };
    return (await response.json()) as ExternalSourceType;
  } catch {
    return { total: 0, items: [] };
  }
};
