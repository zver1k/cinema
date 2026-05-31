import { Bookmark, Eye, Heart } from "lucide-react";

export const emptyStates = {
  favorites: {
    icon: Heart,
    title: "В избранном пока пусто",
    description:
      "Здесь появятся фильмы, которые пользователь добавит в избранное.",
  },
  watched: {
    icon: Eye,
    title: "Просмотренных пока нет",
    description: "Здесь будет история просмотренных фильмов.",
  },
  watchlist: {
    icon: Bookmark,
    title: "Список «хочу посмотреть» пуст",
    description: "Здесь будет очередь фильмов и сериалов на потом.",
  },
};
