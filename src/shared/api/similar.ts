import { SimilarFilmResponse } from "@/shared/types/api.types";

export const getSimilarById = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}/similars`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  const response: SimilarFilmResponse = await data.json();
  return response;
};
