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
  const response: ExternalSourceType = await data.json();
  return response;
};
