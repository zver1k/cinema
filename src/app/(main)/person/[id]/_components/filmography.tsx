import { PersonFilm, StaffType } from "@/shared/types/api.types";
import Link from "next/link";
import { PERSON_ROLE_LABELS } from "@/shared/constants/staff";
import RatingBadge from "@/shared/ui/rating-badge";

function Filmography({ films }: { films: PersonFilm[] }) {
  const grouped = films.reduce(
    (acc, film) => {
      const key = film.professionKey;
      if (!acc[key]) acc[key] = [];
      acc[key].push(film);
      return acc;
    },
    {} as Record<string, PersonFilm[]>,
  );
  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([key, groupFilms]) => (
        <section key={key}>
          <h3 className="mb-3 text-[18px] font-semibold">
            {PERSON_ROLE_LABELS[key as StaffType]} ({groupFilms.length})
          </h3>

          <ul className="flex flex-col">
            {groupFilms.map((film, i) => (
              <li
                key={`${film.filmId}-${i}`}
                className="flex items-center justify-between border-b py-2"
              >
                <Link
                  href={`/movies/${film.filmId}`}
                  className="hover:underline"
                >
                  {film.nameRu ?? film.nameEn ?? "Без названия"}
                </Link>
                {film.rating && <RatingBadge value={parseFloat(film.rating)} />}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Filmography;
