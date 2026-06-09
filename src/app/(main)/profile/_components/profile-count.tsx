import { Bookmark, Eye, Heart } from "lucide-react";
import { getFavoritesCount } from "@/lib/favorites";
import { getWatchListCount } from "@/lib/watchlist";
import { WatchStatus } from "@/generated/prisma/enums";

async function ProfileCount() {
  const [favoritesCount, watchedCount, plannedCount] = await Promise.all([
    getFavoritesCount(),
    getWatchListCount({ status: WatchStatus.WATCHED }),
    getWatchListCount({ status: WatchStatus.PLANNED }),
  ]);
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex gap-3 items-center justify-center text-center rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Eye size={18} />
        </div>
        <div className="text-3xl font-bold">{watchedCount}</div>
        <div className="mt-1 text-sm text-muted-foreground">Просмотрено</div>
      </div>
      <div className="flex gap-3 items-center justify-center rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart size={18} />
        </div>
        <div className="text-3xl font-bold">{favoritesCount}</div>
        <div className="mt-1 text-sm text-muted-foreground">В избранном</div>
      </div>
      <div className="flex gap-3 items-center justify-center rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bookmark size={18} />
        </div>
        <div className="text-3xl font-bold">{plannedCount}</div>
        <div className="mt-1 text-sm text-muted-foreground">В планах</div>
      </div>
    </div>
  );
}

export default ProfileCount;
