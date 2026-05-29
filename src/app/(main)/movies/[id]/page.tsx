import { getFilmsById } from "@/shared/api/films";
import { Bookmark, Heart, Play } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import BackButton from "@/shared/ui/back-button";
import RatingBadge from "@/shared/ui/rating-badge";
import CastSection from "@/app/(main)/movies/[id]/_components/cast-section";
import ReviewsSection from "@/app/(main)/movies/[id]/_components/reviews-section";
import StreamChips from "@/app/(main)/movies/[id]/_components/stream-chips";
import { getCastById } from "@/shared/api/cast";
import SimilarSection from "@/widgets/SimilarSection";
import Poster from "@/shared/ui/poster";
import { isFavorite } from "@/lib/favorites";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getFilmsById(id);
  const director = await getCastById(id);
  const directorName = director.find((c) => c.professionKey === "DIRECTOR");

  const isFav = await isFavorite(id);
  const inWatch = true;
  const rating = movie.ratingKinopoisk;

  return (
    <>
      <div className="min-w-0 px-9 pt-8 pb-15">
        <BackButton />
        <div className="mx-auto grid max-w-300 grid-cols-[minmax(280px,380px)_1fr] gap-12.5">
          <div>
            <Poster movie={movie} />
            <div className="mt-4.5 flex flex-col gap-2.5">
              <Button>
                <Play size={16} /> Смотреть
              </Button>
              <Button>
                <Heart size={16} />
                {isFav ? "В избранном" : "В избранное"}
              </Button>
              <Button>
                <Bookmark size={16} />
                {inWatch ? "В списке" : "Хочу посмотреть"}
              </Button>
            </div>
            <div className="mt-4">Блок фактов</div>
          </div>
          <div className="min-w-0 flex flex-col gap-2">
            <div className="flex gap-2">
              {movie.genres.map((genre) => {
                return <Badge key={genre.genre}>{genre.genre}</Badge>;
              })}
            </div>
            <h1 className="mb-1 text-[54px] font-bold leading-[1.02] tracking-tight">
              {movie.nameRu}
            </h1>
            <div className="text-ring text-[18px] mb-6">
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
              <p className="font-light text-2xl border-l-3 pl-4 mb-7">
                {movie.slogan}
              </p>
            )}
            <div className="mb-9">
              <h3 className="mb-3.5 text-[18px] font-semibold">О сюжете</h3>
              <p className="text-[15px] leading-[1.7] text-pretty">
                {movie.description}
              </p>
            </div>
            <StreamChips id={id} />
            <CastSection id={id} />
            <ReviewsSection id={id} />
            <SimilarSection id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
