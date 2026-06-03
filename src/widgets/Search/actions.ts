"use server";
import { getFilmsByKeyword } from "@/shared/api/search";

export async function searchMovies({ keyword }: { keyword: string }) {
  return getFilmsByKeyword({ keyword, page: 1 });
}
