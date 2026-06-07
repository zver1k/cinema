import { House, Telescope, Heart, User, Popcorn } from "lucide-react";

export const sidebarItems = [
  {
    title: "Главная",
    icon: House,
    href: "/",
  },
  {
    title: "Каталог",
    icon: Telescope,
    href: "/movies",
  },
  {
    title: "Новинки",
    icon: Popcorn,
    href: "/new",
  },
  {
    title: "Избранное",
    icon: Heart,
    href: "/profile",
  },
  {
    title: "Профиль",
    icon: User,
    href: "/profile?tab=settings",
  },
];
