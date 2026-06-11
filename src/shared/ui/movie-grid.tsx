import { MovieItem } from "@/shared/types/api.types";
import RatingBadge from "@/shared/ui/rating-badge";
import { Card } from "@/shared/ui/card";
import Link from "next/link";
import { ViewMode } from "@/shared/types/search.types";
import { Badge } from "@/shared/ui/badge";
import PosterImage from "@/shared/ui/poster-image";

function MovieCard({ film }: { film: MovieItem }) {
  return (
    <Link href={`/movies/${film.kinopoiskId}`}>
      <Card className="relative w-full py-0 overflow-hidden transition hover:scale-103">
        <div className="relative aspect-2/3 w-full overflow-hidden">
          <PosterImage
            src={film.posterUrlPreview}
            alt={film.nameRu ?? film.nameEn ?? "Логотип"}
            sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
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

function MovieRow({ film }: { film: MovieItem }) {
  return (
    <Link href={`/movies/${film.kinopoiskId}`}>
      <Card className="flex flex-col gap-4 p-4 transition hover:scale-103 sm:flex-row sm:p-6">
        <div className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-xl sm:h-60 sm:w-40">
          <PosterImage
            src={film.posterUrlPreview}
            alt={film.nameRu ?? film.nameEn ?? "Логотип"}
            sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
          />
          <div className="absolute top-2 left-2">
            {film.ratingKinopoisk && (
              <RatingBadge value={film.ratingKinopoisk} />
            )}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap gap-2">
            {film.genres.map((genre) => {
              return <Badge key={genre.genre}>{genre.genre}</Badge>;
            })}
          </div>
          <h2 className="mb-1 text-2xl font-bold leading-[1.05] tracking-tight sm:text-3xl sm:leading-[1.02]">
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
  films: MovieItem[];
  view: ViewMode;
}) {
  return (
    <div
      className={`${view === "grid" ? "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "flex flex-col gap-4"}`}
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
