import { getFilmPremieres } from "@/shared/api/premieres";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

export async function NewMovieSection() {
  const { items } = await getFilmPremieres();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {items.map((film, index) => {
        const formattedDate = new Intl.DateTimeFormat("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(film.premiereRu));
        return (
          <Card
            key={film.kinopoiskId}
            className="relative mx-auto w-full max-w-sm pt-0"
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-xl">
              <Image
                src={film.posterUrlPreview}
                alt={film.nameRu ?? film.nameEn ?? "Логотип"}
                fill
                priority={index === 0}
                sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 1023px) calc((100vw - 96px) / 2), (max-width: 1535px) calc((100vw - 416px) / 3), calc((100vw - 432px) / 4)"
                unoptimized
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardAction className="flex flex-col gap-2">
                {film.genres.map((genre) => {
                  return (
                    <Badge key={genre.genre} variant="secondary">
                      {genre.genre}
                    </Badge>
                  );
                })}
              </CardAction>
              <CardTitle>
                {film.nameRu ?? film.nameEn ?? "Без названия"}
              </CardTitle>
              <CardDescription>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>
                    Длительность:{" "}
                    {film.duration
                      ? `${Math.floor(film.duration / 60)} ч ${film.duration % 60} мин`
                      : "-"}
                  </li>
                  <li>
                    Страна:{" "}
                    {film.countries.map((country) => {
                      return (
                        <Badge key={country.country}>{country.country}</Badge>
                      );
                    })}
                  </li>
                  <li>Год производства: {film.year}</li>
                  <li>
                    <div className="flex flex-col gap-2">
                      Премьера в России:
                      <span className="text-lg font-semibold">
                        {formattedDate}
                      </span>
                    </div>
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Подробнее</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
