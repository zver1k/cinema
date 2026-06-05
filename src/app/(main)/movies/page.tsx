import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { getFilters } from "@/shared/api/filters";
import GenreFilter from "@/shared/ui/genre-filter";
import { connection } from "next/server";
import InfiniteMovies from "@/app/(main)/movies/_components/infinite-movies";
import MoviesList from "@/app/(main)/movies/_components/movies-list";
import { Suspense } from "react";
import Loading from "@/app/(main)/movies/loading";

async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    type?: string;
    view?: string;
    page?: string;
    genre?: string;
  }>;
}) {
  await connection();

  const {
    keyword,
    type,
    view = "pagination",
    page,
    genre,
  } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeGenre = Number(genre) || 0;
  const viewParams = (v: string) => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (type) params.set("type", type);
    if (activeGenre) params.set("genre", activeGenre.toString());
    params.set("view", v.toString());
    return `?${params.toString()}`;
  };
  const { genres } = await getFilters();
  return (
    <div>
      <GenreFilter genres={genres} activeGenre={activeGenre} />
      <div className="pb-2">
        <Button asChild variant={view === "pagination" ? "default" : "outline"}>
          <Link href={viewParams("pagination")}>Пагинация</Link>
        </Button>
        <Button asChild variant={view === "infinite" ? "default" : "outline"}>
          <Link href={viewParams("infinite")}>Бесконечная</Link>
        </Button>
      </div>

      {view === "infinite" ? (
        <InfiniteMovies
          view="grid"
          keyword={keyword}
          type={type}
          genreID={activeGenre || undefined}
        />
      ) : (
        <Suspense fallback={<Loading />}>
          <MoviesList
            keyword={keyword}
            page={currentPage}
            genre={activeGenre}
            type={type}
          />
        </Suspense>
      )}
    </div>
  );
}

export default MoviesPage;
