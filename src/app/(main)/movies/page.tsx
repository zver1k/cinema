import { getFilms } from "@/shared/api/films";
import MovieGrid from "@/shared/ui/movie-grid";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { items, totalPages } = await getFilms(0, currentPage);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div>
      <MovieGrid films={items} view={"grid"} />
      <div className="flex justify-between mt-4">
        {isFirst ? (
          <Button disabled variant="secondary">
            Назад
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`?page=${currentPage - 1}`}>Назад</Link>
          </Button>
        )}
        {isLast ? (
          <Button disabled variant="secondary">
            Вперёд
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`?page=${currentPage + 1}`}>Вперёд</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
