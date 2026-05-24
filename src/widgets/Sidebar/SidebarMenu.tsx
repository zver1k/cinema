import { sidebarItems } from "@/shared/constants/menu";
import Link from "next/link";

function SidebarMenu() {
  return (
    <ul className="flex flex-col gap-3">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-muted hover:text-primary"
            key={item.title}
          >
            <Icon className="size-5" />
            {item.title}
          </Link>
        );
      })}
    </ul>
  );
}

export default SidebarMenu;
