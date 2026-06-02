import { getFilms } from "@/shared/api/films";
import MovieGrid from "@/shared/ui/movie-grid";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { getFilters } from "@/shared/api/filters";
import GenreFilter from "@/app/(main)/movies/_components/genre-filter";

async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; genre?: string }>;
}) {
  const { page, genre } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeGenre = Number(genre) || 0;
  const [{ items, totalPages }, { genres, countries }] = await Promise.all([
    getFilms(activeGenre, currentPage),
    getFilters(),
  ]);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div>
      <GenreFilter genres={genres} activeGenre={activeGenre} />
      <MovieGrid films={items} view={"grid"} />
      <div className="flex justify-between mt-4">
        {isFirst ? (
          <Button disabled variant="secondary">
            Назад
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`?genre=${activeGenre}&page=${currentPage - 1}`}>
              Назад
            </Link>
          </Button>
        )}
        {isLast ? (
          <Button disabled variant="secondary">
            Вперёд
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`?genre=${activeGenre}&page=${currentPage + 1}`}>
              Вперёд
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
