import Link from "next/link";
import { SortKey } from "@/shared/types/search.types";
import { ProfileTab } from "@/shared/types/profile.types";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { sorts } from "@/shared/constants/sorts";

function SortSelect({
  activeTab,
  activeSort,
}: {
  activeTab: ProfileTab;
  activeSort: SortKey;
}) {
  return (
    <div className="sm:ml-auto">
      {sorts.map((sort) => (
        <Button
          asChild
          className={cn(
            "h-10 rounded-4xl px-4",
            activeSort === sort.id && "shadow-sm",
          )}
          key={sort.id}
          variant={activeSort === sort.id ? "secondary" : "ghost"}
        >
          <Link href={`/profile?tab=${activeTab}&sort=${sort.id}`}>
            {sort.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default SortSelect;
