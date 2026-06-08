import { expect, test, describe } from "vitest";
import { getRandomItems } from "./array";

describe("getRandomItems", () => {
  test("возвращает нужное количество элементов", () => {
    const result = getRandomItems([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });
  test("не возвращает больше элементов чем есть в массиве", () => {
    const result = getRandomItems([1, 2, 3, 4, 5], 7);
    expect(result).toHaveLength(5);
  });
  test("содержит только элементы из исходного массива", () => {
    const source = [1, 2, 3, 4, 5];
    const result = getRandomItems(source, 3);
    result.forEach((item) => {
      expect(source).toContain(item);
    });
  });
});
