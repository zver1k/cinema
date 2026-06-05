"use client";

import { toggleFavorite } from "@/app/(main)/movies/[id]/actions";
import { Button } from "@/shared/ui/button";
import { Heart } from "lucide-react";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";

function FavoriteButton({
  isFav,
  id,
  isLoggedIn,
}: {
  isFav: boolean;
  id: string;
  isLoggedIn: boolean;
}) {
  const [optimisticFav, setOptimisticFav] = useOptimistic(
    isFav,
    (_current, next: boolean) => next,
  );
  const router = useRouter();
  return (
    <form
      className="contents"
      action={async () => {
        if (!isLoggedIn) {
          router.push("/login");
          return;
        }
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
