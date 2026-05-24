import { FilterResponse } from "@/shared/types/api.types";
import { api } from "@/shared/api/axios.instance";

export const getFilters = async () => {
  const response = await api.get<FilterResponse>(`/api/v2.2/films/filters`);
  return response.data;
};
