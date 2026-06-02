import { PersonFilm } from "@/shared/types/api.types";
import Link from "next/link";
import { PERSON_ROLE_LABELS } from "@/shared/constants/staff";

function Filmography({ films }: { films: PersonFilm[] }) {
  return (
    <div className="flex flex-col gap-4">
      {films.map((film, i) => {
        return (
          <Link key={i} href={`/movies/${film.filmId}`}>
            <ul>
              <li>{film.nameRu || film.nameEn || "Без названия"}</li>
              <li>Роль: {PERSON_ROLE_LABELS[film.professionKey] || ""}</li>
              <li>{film.rating && `Рейтинг: ${film.rating}`}</li>
            </ul>
          </Link>
        );
      })}
    </div>
  );
}

export default Filmography;
