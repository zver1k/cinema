import { StaffType } from "@/shared/types/api.types";

export const PROFESSION_LABELS: Partial<Record<StaffType, string>> = {
  DIRECTOR: "Режиссеры",
  WRITER: "Сценаристы",
  PRODUCER: "Продюсеры",
  PRODUCER_USSR: "Продюсеры",
  OPERATOR: "Операторы",
  TRANSLATOR: "Переводчики",
  COMPOSER: "Композиторы",
  DESIGN: "Художники",
  EDITOR: "Монтажеры",
};
