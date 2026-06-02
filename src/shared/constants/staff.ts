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

export const PERSON_ROLE_LABELS: Record<StaffType, string> = {
  WRITER: "Сценарист",
  OPERATOR: "Оператор",
  EDITOR: "Монтажер",
  COMPOSER: "Композитор",
  PRODUCER_USSR: "Продюсер",
  TRANSLATOR: "Переводчик",
  DIRECTOR: "Режиссер",
  DESIGN: "Художник",
  PRODUCER: "Продюсер",
  ACTOR: "Актер",
  VOICE_DIRECTOR: "Режиссер дубляжа",
  UNKNOWN: "Неизвестно",
  HIMSELF: "Играет себя",
  HERSELF: "Играет себя",
  HRONO_TITR_MALE: "Титры",
  HRONO_TITR_FEMALE: "Титры",
};
