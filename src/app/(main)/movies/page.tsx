import { getFilms } from "@/shared/api/films";
import MovieGrid from "@/shared/ui/movie-grid";

async function MoviesPage() {
  const { items } = await getFilms();

  return (
    <div>
      <MovieGrid films={items} view={"grid"} />
    </div>
  );
}

export default MoviesPage;
