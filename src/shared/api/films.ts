import { FilmDetail, FilmResponse } from "@/shared/types/api.types";
import { notFound } from "next/navigation";

export const getFilms = async ({
  genreID,
  page = 1,
  type,
}: {
  genreID?: number;
  page?: number;
  type?: string;
}) => {
  const params = new URLSearchParams();
  if (genreID) params.append("genres", genreID.toString());
  if (type) params.append("type", type);
  params.append("page", page.toString());
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films?${params.toString()}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (data.status === 402)
    return { items: [] as FilmResponse["items"], total: 0, totalPages: 0 };
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
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (data.status === 404 || data.status === 400 || data.status === 402)
    return notFound();
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmDetail = await data.json();
  return response;
};

export const getFilmByIdSafe = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (data.status === 404 || data.status === 400 || data.status === 402)
    return null;
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: FilmDetail = await data.json();
  return response;
};
