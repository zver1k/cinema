import { House, Telescope, Heart, User, Settings2 } from "lucide-react";

export const sidebarItems = [
  {
    title: "Главная",
    icon: House,
    href: "/",
  },
  {
    title: "Обзор",
    icon: Telescope,
    href: "/explore",
  },
  {
    title: "Избранное",
    icon: Heart,
    href: "/favorites",
  },
  {
    title: "Профиль",
    icon: User,
    href: "/profile",
  },
  {
    title: "Настройки",
    icon: Settings2,
    href: "/settings",
  },
];
