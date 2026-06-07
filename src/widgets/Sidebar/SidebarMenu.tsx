import { sidebarItems } from "@/shared/constants/menu";
import Link from "next/link";

function SidebarMenu() {
  return (
    <ul className="fixed right-2 bottom-2 left-2 z-50 grid grid-cols-5 gap-1 rounded-3xl bg-card/95 p-2 shadow-2xl ring-1 ring-foreground/10 backdrop-blur lg:static lg:flex lg:grid-cols-none lg:flex-col lg:gap-3 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0 lg:backdrop-blur-none">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            className="flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] leading-none transition hover:bg-muted hover:text-primary lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3 lg:text-base"
            key={item.title}
          >
            <Icon className="size-5" />
            <span className="max-w-full truncate">{item.title}</span>
          </Link>
        );
      })}
    </ul>
  );
}

export default SidebarMenu;
