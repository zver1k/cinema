import { CollectionType } from "@/shared/types/api.types";

export const collectionData = [
  {
    type: "TOP_250_MOVIES",
    title: "Топ 250 фильмов",
    slug: "movies",
  },
  {
    type: "TOP_250_TV_SHOWS",
    title: "Топ 250 сериалов",
    slug: "tv-shows",
  },
  {
    type: "CATASTROPHE_THEME",
    title: "Фильмы-катастрофы",
    slug: "catastrophe",
  },
  {
    type: "FAMILY",
    title: "Семейное кино",
    slug: "family",
  },
  {
    type: "VAMPIRE_THEME",
    title: "Про вампиров",
    slug: "vampire",
  },
  {
    type: "COMICS_THEME",
    title: "Комиксы",
    slug: "comics",
  },
] satisfies { type: CollectionType; title: string; slug: string }[];
