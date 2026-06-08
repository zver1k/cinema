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
}): Promise<FilmResponse> => {
  const params = new URLSearchParams();
  if (genreID) params.append("genres", genreID.toString());
  if (type) params.append("type", type);
  params.append("page", page.toString());
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films?${params.toString()}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok)
      return { items: [] as FilmResponse["items"], total: 0, totalPages: 0 };
    return await response.json();
  } catch {
    return { items: [] as FilmResponse["items"], total: 0, totalPages: 0 };
  }
};

export const getFilmsById = async (id: string): Promise<FilmDetail> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24, tags: [`film-${id}`] },
      },
    );
    if (!response.ok) notFound();
    return await response.json();
  } catch {
    notFound();
  }
};

export const getFilmByIdSafe = async (
  id: string,
): Promise<FilmDetail | null> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24, tags: [`film-${id}`] },
      },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};
