import { getFilms } from "@/shared/api/films";
import MovieGrid from "@/shared/ui/movie-grid";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { getFilters } from "@/shared/api/filters";
import GenreFilter from "@/app/(main)/movies/_components/genre-filter";
import { getFilmsByKeyword } from "@/shared/api/search";

async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    keyword?: string;
    type?: string;
  }>;
}) {
  const { page, genre, keyword, type } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeGenre = Number(genre) || 0;
  const [{ items, totalPages }, { genres }] = await Promise.all([
    keyword
      ? getFilmsByKeyword({ keyword, page: currentPage, type })
      : getFilms(activeGenre, currentPage),
    getFilters(),
  ]);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const paginationParams = (p: number) => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (type) params.set("type", type);
    if (activeGenre) params.set("genre", activeGenre.toString());
    params.set("page", p.toString());
    return `?${params.toString()}`;
  };

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
            <Link href={paginationParams(currentPage - 1)}>Назад</Link>
          </Button>
        )}
        {isLast ? (
          <Button disabled variant="secondary">
            Вперёд
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={paginationParams(currentPage + 1)}>Вперёд</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
