export function filmName(
  {
    nameRu,
    nameEn,
    nameOriginal,
  }: {
    nameRu?: string | null;
    nameEn?: string | null;
    nameOriginal?: string | null;
  },
  fallback = "Без названия",
) {
  return nameRu || nameEn || nameOriginal || fallback;
}
