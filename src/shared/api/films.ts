import { api } from "@/shared/api/axios.instance";
import { FilmResponse } from "@/shared/types/api.types";

export const getFilms = async (genreID?: number) => {
  const response = await api.get<FilmResponse>(`/api/v2.2/films`, {
    params: { genres: genreID },
  });
  return response.data;
};
