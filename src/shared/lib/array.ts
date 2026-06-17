import dayjs from "dayjs";

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  shuffled.sort(() => Math.random() - 0.5);
  const safeCount = Math.min(count, array.length);
  return shuffled.slice(0, safeCount);
}

export function getPremieresItems<T extends { premiereRu: string }>(
  array: T[],
  count: number,
): T[] {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const premieres = [...array];
  const nearestPremieres = premieres
    .filter((film) => {
      const filmDate = dayjs(film.premiereRu);
      return filmDate.isValid() && filmDate.format("YYYY-MM-DD") >= currentDate;
    })
    .sort((a, b) => {
      const dateA = dayjs(a.premiereRu);
      const dateB = dayjs(b.premiereRu);
      if (!dateA.isValid() && !dateB.isValid()) return 0;
      return dateA.diff(dateB, "millisecond");
    });
  const safeCount = Math.min(count, nearestPremieres.length);
  return nearestPremieres.slice(0, safeCount);
}
