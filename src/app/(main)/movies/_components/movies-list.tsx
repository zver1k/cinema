import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { getFilmsByKeyword } from "@/shared/api/search";
import { getFilms } from "@/shared/api/films";
import MovieGrid from "@/shared/ui/movie-grid";

async function MoviesList({
  keyword,
  page,
  genre,
  type,
}: {
  keyword?: string;
  page?: number;
  genre?: number;
  type?: string;
}) {
  const currentPage = page ?? 1;
  const activeGenre = genre ?? 0;
  const { items, totalPages = 0 } = await (keyword
    ? getFilmsByKeyword({ keyword, page: currentPage, type })
    : getFilms({
        genreID: activeGenre || undefined,
        page: currentPage,
        type,
      }));

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
    <>
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
    </>
  );
}

export default MoviesList;
