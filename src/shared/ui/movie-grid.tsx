import { FilmDetail } from "@/shared/types/api.types";
import Image from "next/image";
import RatingBadge from "@/shared/ui/rating-badge";
import { Card } from "@/shared/ui/card";
import Link from "next/link";
import { ViewMode } from "@/shared/types/search.types";
import { Badge } from "@/shared/ui/badge";

function MovieCard({ film }: { film: FilmDetail }) {
  return (
    <Link href={`/movies/${film.kinopoiskId}`}>
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
}

function MovieRow({ film }: { film: FilmDetail }) {
  return (
    <Link href={`/movies/${film.kinopoiskId}`}>
      <Card className="flex flex-row gap-4 p-6 transition hover:scale-103">
        <div className="relative h-60 w-40 shrink-0 overflow-hidden rounded-xl">
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {film.genres.map((genre) => {
              return <Badge key={genre.genre}>{genre.genre}</Badge>;
            })}
          </div>
          <h2 className="mb-1 text-3xl font-bold leading-[1.02] tracking-tight">
            {film.nameRu ?? film.nameEn ?? film.nameOriginal ?? "Без названия"}
          </h2>
          <div className="mb-6">Год производства {film.year}</div>
          <div className="mb-4.5">
            {film.filmLength && (
              <span>Длительность: {film.filmLength} мин</span>
            )}
          </div>
          <div className="mb-4.5">{film.description}</div>
        </div>
      </Card>
    </Link>
  );
}

function MovieGrid({
  films,
  view = "grid",
}: {
  films: FilmDetail[];
  view: ViewMode;
}) {
  return (
    <div
      className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "flex flex-col"}  gap-4`}
    >
      {films.map((film) =>
        view === "grid" ? (
          <MovieCard key={film.kinopoiskId} film={film} />
        ) : (
          <MovieRow key={film.kinopoiskId} film={film} />
        ),
      )}
    </div>
  );
}

export default MovieGrid;
