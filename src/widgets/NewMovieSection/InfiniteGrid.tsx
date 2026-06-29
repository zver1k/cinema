"use client";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Premier } from "@/shared/types/api.types";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Link from "next/link";
import PosterImage from "@/shared/ui/poster-image";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useEffect, useRef, useState } from "react";

function InfiniteGrid({ items }: { items: Premier[] }) {
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisibleCount((prev) => prev + 12);
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.slice(0, visibleCount).map((film) => {
          return (
            <Card
              key={film.kinopoiskId}
              className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0"
            >
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl">
                <Link href={`/movies/${film.kinopoiskId}`}>
                  <PosterImage
                    alt={film.nameRu || film.nameEn || ""}
                    src={film.posterUrlPreview}
                    sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
                  />
                </Link>
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
                  <Link href={`/movies/${film.kinopoiskId}`}>
                    {film.nameRu ?? film.nameEn ?? "Без названия"}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex flex-col gap-2 ">
                    {film.duration && (
                      <p>
                        {`Длительность: ${Math.floor(film.duration / 60)} ч ${film.duration % 60}
                      мин`}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      <p> Страна:</p>
                      <div className="flex flex-wrap gap-2">
                        {film.countries.map((country) => {
                          return (
                            <Badge key={country.country}>
                              {country.country}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    {film.year && <p>Год производства: {film.year} г.</p>}
                    <div className="flex flex-wrap gap-2">
                      Премьера в России:
                      <span className="font-semibold">
                        {dayjs(film.premiereRu)
                          .locale("ru")
                          .format("DD MMMM YYYY г.")}
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pb-4">
                <Button asChild className="w-full">
                  <Link href={`/movies/${film.kinopoiskId}`}>Подробнее</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {visibleCount < items.length && <div ref={sentinelRef} />}
    </>
  );
}

export default InfiniteGrid;
