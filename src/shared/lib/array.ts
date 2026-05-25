export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  shuffled.sort(() => Math.random() - 0.5);
  const safeCount = Math.min(count, array.length);
  return shuffled.slice(0, safeCount);
}
