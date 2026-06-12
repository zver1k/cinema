import { getFilmByIdSafe, getFilmsById } from "@/shared/api/films";
import { Badge } from "@/shared/ui/badge";
import BackButton from "@/shared/ui/back-button";
import RatingBadge from "@/shared/ui/rating-badge";
import CastSection, {
  CastSectionSkeleton,
} from "@/app/(main)/movies/[id]/_components/cast-section";
import ReviewsSection from "@/app/(main)/movies/[id]/_components/reviews-section";
import StreamChips, {
  StreamChipsSkeleton,
} from "@/app/(main)/movies/[id]/_components/stream-chips";
import { getCastById } from "@/shared/api/cast";
import SimilarSection, {
  SimilarSectionSkeleton,
} from "@/widgets/SimilarSection";
import Poster from "@/shared/ui/poster";
import { isFavorite } from "@/lib/favorites";
import { getWatchStatus } from "@/lib/watchlist";
import BoxOffice, {
  BoxOfficeSkeleton,
} from "@/app/(main)/movies/[id]/_components/box-office";
import FilmFacts, {
  FilmFactsSkeleton,
} from "@/app/(main)/movies/[id]/_components/film-facts";
import FavoriteButton from "@/app/(main)/movies/[id]/_components/favorite-button";
import WatchButtons from "@/app/(main)/movies/[id]/_components/watch-buttons";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { filmName } from "@/shared/lib/film-name";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const film = await getFilmByIdSafe(id);
  if (!film) return {};
  return {
    title: filmName(film, "Фильм"),
    description: film.description,
    openGraph: {
      title: filmName(film, "Фильм"),
      description: film.description ?? "",
      images: film.posterUrl ? [film.posterUrl] : [],
    },
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const h = await headers();
  const [session, movie, director, isFav, inWatch] = await Promise.all([
    auth.api.getSession({ headers: h }),
    getFilmsById(id),
    getCastById(id),
    isFavorite(id),
    getWatchStatus(id),
  ]);

  const rating = movie.ratingKinopoisk;
  const directorName = director.find((c) => c.professionKey === "DIRECTOR");

  return (
    <>
      <div className="min-w-0">
        <BackButton />
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-12.5">
          <div className="mx-auto w-full max-w-95 lg:max-w-none">
            <Poster movie={movie} />
            <div className="mt-4.5 flex flex-col gap-2.5">
              <FavoriteButton isFav={isFav} id={id} isLoggedIn={!!session} />
              <WatchButtons id={id} inWatch={inWatch} isLoggedIn={!!session} />
            </div>
            <Suspense fallback={<BoxOfficeSkeleton />}>
              <BoxOffice id={id} />
            </Suspense>
            <Suspense fallback={<FilmFactsSkeleton />}>
              <FilmFacts id={id} />
            </Suspense>
          </div>
          <div className="min-w-0 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => {
                return <Badge key={genre.genre}>{genre.genre}</Badge>;
              })}
            </div>
            <h1 className="mb-1 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[54px] lg:leading-[1.02]">
              {filmName(movie)}
            </h1>
            <div className="mb-4 text-base text-ring sm:text-[18px] lg:mb-6">
              {movie.nameOriginal} · {movie.year}
            </div>
            <div className="mb-4.5 flex flex-wrap items-center gap-4.5 text-[14px]">
              {rating && <RatingBadge value={rating} />}

              {movie.filmLength && (
                <>
                  <span>{movie.filmLength} мин</span>
                  <span>·</span>
                </>
              )}
              <span className="flex gap-2">
                {movie.countries.map((country) => {
                  return (
                    <Badge variant={"outline"} key={country.country}>
                      {country.country}
                    </Badge>
                  );
                })}
              </span>

              {directorName && (
                <>
                  <span>·</span>
                  <span>Реж. {directorName.nameRu || directorName.nameEn}</span>
                </>
              )}
            </div>
            {movie.slogan && (
              <p className="mb-6 border-l-3 pl-4 text-xl font-light sm:text-2xl lg:mb-7">
                {movie.slogan}
              </p>
            )}
            {movie.description && (
              <div className="mb-9">
                <h3 className="mb-3.5 text-[18px] font-semibold">О сюжете</h3>
                <p className="text-[15px] leading-[1.7] text-pretty">
                  {movie.description}
                </p>
              </div>
            )}
            <Suspense fallback={<StreamChipsSkeleton />}>
              <StreamChips id={id} />
            </Suspense>
            <Suspense fallback={<CastSectionSkeleton />}>
              <CastSection id={id} />
            </Suspense>
            <Suspense fallback={<Skeleton />}>
              <ReviewsSection id={id} />
            </Suspense>
            <Suspense fallback={<SimilarSectionSkeleton />}>
              <SimilarSection id={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
