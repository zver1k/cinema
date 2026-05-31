import { SortKey } from "@/shared/types/search.types";

export const sorts: Array<{ id: SortKey; label: string }> = [
  { id: "name", label: "По имени" },
  { id: "year", label: "По году" },
  { id: "rating", label: "По рейтингу" },
];

export const sortSet = new Set<SortKey>(sorts.map((s) => s.id));
