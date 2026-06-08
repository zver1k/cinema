import { Film, MovieItem, SimilarFilm } from "@/shared/types/api.types";
import Image from "next/image";
import { Card } from "@/shared/ui/card";
import RatingBadge from "@/shared/ui/rating-badge";

function FilmCard({
  film,
  eager = false,
}: {
  film: Film | SimilarFilm | MovieItem;
  eager?: boolean;
}) {
  const rating = "ratingKinopoisk" in film ? film.ratingKinopoisk : null;

  return (
    <Card className="relative w-full pt-0 overflow-hidden transition hover:scale-103">
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <Image
          src={film.posterUrl}
          alt={film.nameRu ?? film.nameEn ?? "Логотип"}
          fill
          sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
          loading={eager ? "eager" : undefined}
          unoptimized
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          {rating && <RatingBadge value={rating} />}
        </div>
      </div>
    </Card>
  );
}

export default FilmCard;
