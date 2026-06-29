import { PersonFilm, StaffType } from "@/shared/types/api.types";
import Link from "next/link";
import { PERSON_ROLE_LABELS } from "@/shared/constants/staff";
import RatingBadge from "@/shared/ui/rating-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { filmName } from "@/shared/lib/film-name";

function Filmography({ films }: { films: PersonFilm[] }) {
  if (!films.length) return null;
  const grouped = films.reduce(
    (acc, film) => {
      const key = film.professionKey;

      if (!acc[key]) acc[key] = [];

      if (!acc[key].some((f) => f.filmId === film.filmId)) {
        acc[key].push(film);
      }

      return acc;
    },
    {} as Record<string, PersonFilm[]>,
  );
  const entries = Object.entries(grouped);

  return (
    <section className="mt-6 w-full min-w-0">
      <h3 className="mb-3 text-[18px] font-semibold">Фильмография</h3>
      <Tabs defaultValue={entries[0]?.[0]} className="w-full min-w-0">
        <div className="-mx-4 overflow-x-auto pb-2 px-4 sm:mx-0 sm:px-0">
          <TabsList variant="line" className="w-max min-w-full justify-start">
            {entries.map(([key, groupFilms]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="shrink-0 whitespace-nowrap text-sm"
              >
                {PERSON_ROLE_LABELS[key as StaffType] ?? "Прочее"} (
                {groupFilms.length})
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {entries.map(([key, groupFilms]) => (
          <TabsContent key={key} value={key} className="mt-3">
            <ul className="flex flex-col">
              {groupFilms.map((film, i) => (
                <li
                  key={`${film.filmId}-${i}`}
                  className="flex flex-col gap-2 border-b py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <Link
                    href={`/movies/${film.filmId}`}
                    className="min-w-0 text-sm font-medium leading-snug hover:underline sm:text-base"
                  >
                    {filmName(film)}
                  </Link>

                  {film.rating && (
                    <div className="shrink-0 self-start sm:self-center">
                      <RatingBadge value={parseFloat(film.rating)} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export default Filmography;
