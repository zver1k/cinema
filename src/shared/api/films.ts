import { FilmResponse } from "@/shared/types/api.types";

export const getFilms = async (genreID?: number) => {
  const params = new URLSearchParams();
  if (genreID) params.append("genres", genreID.toString());
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films?${params.toString()}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 3600 },
    },
  );
  const response: FilmResponse = await data.json();
  return response;
};
