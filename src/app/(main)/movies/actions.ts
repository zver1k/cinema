"use server";

import { getFilms } from "@/shared/api/films";
import { getFilmsByKeyword } from "@/shared/api/search";
import { FilmResponse } from "@/shared/types/api.types";

export async function fetchMovies({
  page,
  keyword,
  type,
  genreID,
}: {
  page: number;
  keyword?: string;
  type?: string;
  genreID?: number;
}) {
  return keyword
    ? ((await getFilmsByKeyword({
        keyword,
        page,
        type,
      })) as unknown as FilmResponse)
    : ((await getFilms({ genreID, page, type })) as unknown as FilmResponse);
}
