"use client";

import { WatchStatus } from "@/generated/prisma/enums";
import { useOptimistic } from "react";
import { Bookmark, Eye } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { setWatchStatus } from "@/app/(main)/movies/[id]/actions";

function WatchButtons({
  id,
  inWatch,
}: {
  id: string;
  inWatch: WatchStatus | null;
}) {
  const [optimisticWatch, setOptimisticWatch] = useOptimistic<
    WatchStatus | null,
    WatchStatus
  >(inWatch, (current, clicked) => (current === clicked ? null : clicked));
  return (
    <>
      <form
        className="contents"
        action={async () => {
          setOptimisticWatch(WatchStatus.PLANNED);
          await setWatchStatus(id, WatchStatus.PLANNED);
        }}
      >
        <Button
          variant={
            optimisticWatch === WatchStatus.PLANNED ? "default" : "outline"
          }
        >
          <Bookmark
            className={
              optimisticWatch === WatchStatus.PLANNED ? "fill-red-400" : ""
            }
            size={16}
          />
          {optimisticWatch === WatchStatus.PLANNED
            ? "В планах"
            : "Хочу посмотреть"}
        </Button>
      </form>
      <form
        className="contents"
        action={async () => {
          setOptimisticWatch(WatchStatus.WATCHED);
          await setWatchStatus(id, WatchStatus.WATCHED);
        }}
      >
        <Button
          variant={
            optimisticWatch === WatchStatus.WATCHED ? "default" : "outline"
          }
        >
          <Eye
            className={
              optimisticWatch === WatchStatus.WATCHED ? "fill-red-400" : ""
            }
            size={16}
          />
          {optimisticWatch === WatchStatus.WATCHED
            ? "Просмотрено"
            : "Посмотрел"}
        </Button>
      </form>
    </>
  );
}

export default WatchButtons;
