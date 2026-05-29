import { FilmDetail } from "@/shared/types/api.types";
import Image from "next/image";
import RatingBadge from "@/shared/ui/rating-badge";
import { Card } from "@/shared/ui/card";
import Link from "next/link";

function MovieGrid({ films }: { films: FilmDetail[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {films.map((film: FilmDetail) => {
        return (
          <Link key={film.kinopoiskId} href={`/movies/${film.kinopoiskId}`}>
            <Card className="relative w-full py-0 overflow-hidden transition hover:scale-103">
              <div className="relative aspect-2/3 w-full overflow-hidden">
                <Image
                  src={film.posterUrl}
                  alt={film.nameRu ?? film.nameEn ?? "Логотип"}
                  fill
                  sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  {film.ratingKinopoisk && (
                    <RatingBadge value={film.ratingKinopoisk} />
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default MovieGrid;
