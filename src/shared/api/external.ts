import { ExternalSource, ExternalSourceType } from "@/shared/types/api.types";

export const getExternalById = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}/external_sources`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  if (data.status === 404 || data.status === 402)
    return { total: 0, items: [] };
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: ExternalSourceType = await data.json();
  return response;
};
