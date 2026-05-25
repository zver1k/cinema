import { getFilmsById } from "@/shared/api/films";
import Image from "next/image";
import { Bookmark, CircleArrowLeft, Heart, Play } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getFilmsById(id);
  const inFav = true;
  const inWatch = true;
  return (
    <>
      <div className="min-w-0 px-9 pt-8 pb-15">
        <Link
          className="flex gap-2 items-center transition hover:text-primary"
          href={"/"}
        >
          <CircleArrowLeft size={16} />
          Назад
        </Link>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 380px) 1fr",
            gap: 50,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div>
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-xl">
              <Image
                src={movie.posterUrl}
                alt={movie.nameRu ?? movie.nameEn ?? "Логотип"}
                fill
                className="object-cover"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 18,
              }}
            >
              <Button>
                <Play size={16} />* Смотреть
              </Button>
              <Button>
                <Heart size={16} />
                {inFav ? "В избранном" : "В избранное"}
              </Button>
              <Button>
                <Bookmark size={16} />
                {inWatch ? "В списке" : "Хочу посмотреть"}
              </Button>
            </div>
            <div style={{ marginTop: 18 }}>Блок фактов</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {movie.genres.map((genre) => {
                return <Badge key={genre.genre}>{genre.genre}</Badge>;
              })}
            </div>
            <h1
              style={{
                fontSize: 54,
                fontWeight: 700,
                margin: "0 0 4px",
                letterSpacing: "-.025em",
                lineHeight: 1.02,
              }}
            >
              {movie.nameRu}
            </h1>
            <div className="text-ring text-[18px] mb-6">
              {movie.nameOriginal} · {movie.year}
            </div>
            <div className="mb-4.5 flex flex-wrap items-center gap-4.5 text-[14px]">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-green-500 px-2.5 py-1 text-[14px] font-bold text-[#06140b]">
                ★ {movie.ratingKinopoisk}
              </span>
              <span>{movie.filmLength} мин</span>
              <span>·</span>
              <span className="flex gap-2">
                {movie.countries.map((country) => {
                  return (
                    <Badge variant={"outline"} key={country.country}>
                      {country.country}
                    </Badge>
                  );
                })}
              </span>
              <span>·</span>
              <span>Реж.</span>
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
            <div className="mb-9">
              <h3 className="mb-3.5 text-[18px] font-semibold">Где смотреть</h3>
              {/*<StreamChips streams={movie.streams} />*/}
            </div>
            <div className="mb-9">
              <h3 className="mb-3.5 text-[18px] font-semibold">
                В главных ролях
              </h3>
              {/*<CastSection cast={movie.cast} />*/}
            </div>
            <div className="mb-9">
              <h3 className="mb-3.5 text-[18px] font-semibold">Рецензии</h3>
              {/*<ReviewsSection reviews={reviews} />*/}
            </div>
            <div className="mb-9">
              <h3 className="mb-3.5 text-[18px] font-semibold">Похожее</h3>
              {/*<SimilarSection movie={movie} navigate={navigate} />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
