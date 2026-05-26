import { FilmDetail, FilmResponse } from "@/shared/types/api.types";
import { notFound } from "next/navigation";

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
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmResponse = await data.json();
  return response;
};

export const getFilmsById = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  if (data.status === 404 || data.status === 400) return notFound();
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmDetail = await data.json();
  return response;
};
