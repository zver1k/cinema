import { PersonFilm, StaffType } from "@/shared/types/api.types";
import Link from "next/link";
import { PERSON_ROLE_LABELS } from "@/shared/constants/staff";
import RatingBadge from "@/shared/ui/rating-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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
  const entries = Object.entries(grouped);
  return (
    <Tabs defaultValue={entries[0]?.[0]} className="w-full">
      <TabsList>
        {entries.map(([key, groupFilms]) => (
          <TabsTrigger key={key} value={key}>
            {PERSON_ROLE_LABELS[key as StaffType]} ({groupFilms.length})
          </TabsTrigger>
        ))}
      </TabsList>

      {entries.map(([key, groupFilms]) => (
        <TabsContent key={key} value={key}>
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
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default Filmography;
