import { Film } from "@/shared/types/api.types";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

function FilmCard({ film }: { film: Film }) {
  function getRatingColor(rating: number) {
    if (rating >= 7) return "bg-green-500";
    if (rating >= 5) return "bg-yellow-500";
    return "bg-red-500";
  }
  return (
    <Card className="relative w-full pt-0">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-xl">
        <Image
          src={film.posterUrlPreview}
          alt={film.nameRu ?? film.nameEn ?? "Логотип"}
          fill
          sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 1023px) calc((100vw - 96px) / 2), (max-width: 1535px) calc((100vw - 416px) / 3), calc((100vw - 432px) / 4)"
          className="object-cover"
        />
        {film.ratingKinopoisk && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 ${getRatingColor(film.ratingKinopoisk)}`}
          >
            {film.ratingKinopoisk}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="truncate">
          {film.nameRu ?? film.nameEn ?? "Без названия"}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default FilmCard;
