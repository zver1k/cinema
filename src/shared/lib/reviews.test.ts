import { describe, test, expect } from "vitest";
import { reviewTypeStyles, reviewTypeText } from "./reviews";

const types = ["POSITIVE", "NEGATIVE", "NEUTRAL", "UNKNOWN"] as const;

describe("reviewTypeStyles", () => {
  test("все типы присутствуют", () => {
    types.forEach((type) => {
      expect(reviewTypeStyles[type]).toBeDefined();
    });
  });

  test("значения не пустые", () => {
    types.forEach((type) => {
      expect(reviewTypeStyles[type].length).toBeGreaterThan(0);
    });
  });
});

describe("reviewTypeText", () => {
  test("все типы присутствуют", () => {
    types.forEach((type) => {
      expect(reviewTypeText[type]).toBeDefined();
    });
  });

  test("значения не пустые", () => {
    types.forEach((type) => {
      expect(reviewTypeText[type].length).toBeGreaterThan(0);
    });
  });
});
