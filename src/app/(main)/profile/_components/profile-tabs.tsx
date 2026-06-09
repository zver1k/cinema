import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { ProfileTab } from "@/shared/types/profile.types";

const tabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "favorites", label: "Избранное" },
  { id: "watched", label: "Просмотренные" },
  { id: "watchlist", label: "Хочу посмотреть" },
  { id: "settings", label: "Настройки" },
];
export const tabSet = new Set<ProfileTab>(tabs.map((tab) => tab.id));

export function ProfileTabs({ activeTab }: { activeTab: ProfileTab }) {
  return (
    <nav className="flex gap-2 overflow-x-auto rounded-4xl bg-muted/50 p-1">
      {tabs.map((tab) => (
        <Button
          asChild
          className={cn(
            "h-10 rounded-4xl px-4",
            activeTab === tab.id && "shadow-sm",
          )}
          key={tab.id}
          variant={activeTab === tab.id ? "secondary" : "ghost"}
        >
          <Link
            href={
              tab.id === "favorites" ? "/profile" : `/profile?tab=${tab.id}`
            }
          >
            {tab.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
