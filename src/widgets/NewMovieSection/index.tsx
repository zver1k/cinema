// import { getFilmPremieres } from "@/shared/api/premieres";
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
import { mockPremieres } from "@/shared/mocks/premieres";

export function NewMovieSection() {
  const { items } = mockPremieres;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {items.map((film) => {
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
            <div className="absolute inset-0 z-30 bg-black/35" />
            <img
              src={film.posterUrlPreview}
              alt={film.nameRu ?? film.nameEn ?? "Логотип"}
              className="relative z-20 object-cover"
            />
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
