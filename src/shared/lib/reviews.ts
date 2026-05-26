import { ReviewsType } from "@/shared/types/api.types";

export const reviewTypeStyles: Record<ReviewsType, string> = {
  POSITIVE: "bg-green-500/10 text-green-400 border-green-500/20",
  NEGATIVE: "bg-red-500/10 text-red-400 border-red-500/20",
  NEUTRAL: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  UNKNOWN: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export const reviewTypeText: Record<ReviewsType, string> = {
  POSITIVE: "Положительный",
  NEGATIVE: "Отрицательный",
  NEUTRAL: "Нейтральный",
  UNKNOWN: "Неизвестно",
};
