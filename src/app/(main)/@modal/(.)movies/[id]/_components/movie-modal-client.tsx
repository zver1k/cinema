"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { FilmDetail } from "@/shared/types/api.types";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

function MovieModalClient({ film }: { film: FilmDetail | null }) {
  const router = useRouter();
  if (!film) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={() => router.back()}
    >
      <div
        className="relative flex flex-col items-center md:flex-row w-full max-w-[600px] max-h-[90dvh] overflow-hidden rounded-3xl border bg-card shadow-2xl"
        style={{ maxWidth: "600px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          aria-label="Закрыть модальное окно"
          className="absolute right-3 top-3 z-10 bg-black/40 text-white hover:bg-black/60"
          size="icon-sm"
          variant="ghost"
          onClick={() => router.back()}
        >
          <X size={16} />
        </Button>

        <div
          className="relative shrink-0 overflow-hidden rounded-2xl bg-muted"
          style={{ width: "180px", height: "260px" }}
        >
          <Image
            src={film.posterUrl}
            alt={film.nameRu ?? film.nameEn ?? "Логотип"}
            fill
            sizes="180px"
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto p-5 sm:p-6 md:p-5">
          <div className="flex flex-col gap-2 pr-8">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {film.nameRu ??
                film.nameEn ??
                film.nameOriginal ??
                "Без названия"}
            </h2>
            {film.nameOriginal && (
              <span className="text-sm text-muted-foreground">
                {film.nameOriginal}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {film.year && <Badge variant="outline">{film.year}</Badge>}
            {film.ratingKinopoisk && (
              <Badge>Рейтинг: {film.ratingKinopoisk}</Badge>
            )}
          </div>

          {film.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {film.genres.map((genre) => (
                <Badge key={genre.genre} variant="secondary">
                  {genre.genre}
                </Badge>
              ))}
            </div>
          )}

          {film.description && (
            <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
              {film.description}
            </p>
          )}

          <Button asChild className="mt-auto w-full sm:w-fit">
            <a href={`/movies/${film.kinopoiskId}`}>Подробнее</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieModalClient;
