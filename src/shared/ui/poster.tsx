"use client";

import Image from "next/image";
import { FilmDetail } from "@/shared/types/api.types";
import { useState } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

function Poster({ movie }: { movie: FilmDetail }) {
  const [errorLoadingImage, setErrorLoadingImage] = useState<boolean>(false);
  return (
    <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-xl">
      <Image
        onError={() => setErrorLoadingImage(true)}
        src={movie.posterUrl}
        alt={movie.nameRu ?? movie.nameEn ?? "Логотип"}
        fill
        sizes="(max-width: 1023px) 100vw, (max-width: 1535px) 30vw, 380px"
        loading="eager"
        unoptimized
        className={`object-cover ${errorLoadingImage ? "hidden" : ""}`}
      />
      {errorLoadingImage && <Skeleton className="absolute inset-0" />}
    </div>
  );
}

export default Poster;
