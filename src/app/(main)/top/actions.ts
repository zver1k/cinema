"use server";

import { getCollection } from "@/shared/api/collection";
import { CollectionType } from "@/shared/types/api.types";

export async function fetchTopMovies({
  type,
  page,
}: {
  type: CollectionType;
  page: number;
}) {
  return await getCollection(type, page);
}
