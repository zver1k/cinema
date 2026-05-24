import { api } from "@/shared/api/axios.instance";
import { PremierResponse } from "@/shared/types/api.types";

export const getFilmPremieres = async () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const response = await api.get<PremierResponse>(
    `/api/v2.2/films/premieres?year=${year}&month=${month}`,
  );
  return response.data;
};
