"use client";

import { toggleFavorite } from "@/app/(main)/movies/[id]/actions";
import { Button } from "@/shared/ui/button";
import { Heart } from "lucide-react";
import { useOptimistic } from "react";

function FavoriteButton({ isFav, id }: { isFav: boolean; id: string }) {
  const [optimisticFav, setOptimisticFav] = useOptimistic(
    isFav,
    (_current, next: boolean) => next,
  );
  return (
    <form
      className="contents"
      action={async () => {
        setOptimisticFav(!optimisticFav);
        await toggleFavorite(id);
      }}
    >
      <Button variant={optimisticFav ? "default" : "outline"}>
        <Heart className={optimisticFav ? "fill-red-400" : ""} size={16} />
        {optimisticFav ? "В избранном" : "В избранное"}
      </Button>
    </form>
  );
}

export default FavoriteButton;
