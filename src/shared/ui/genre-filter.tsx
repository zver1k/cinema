import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Genre } from "@/shared/types/api.types";

function GenreFilter({
  genres,
  activeGenre,
}: {
  genres: Genre[];
  activeGenre: number;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button asChild variant={activeGenre === 0 ? "default" : "ghost"}>
        <Link href="?genre">Все</Link>
      </Button>
      {genres.map((g) => {
        if (g.genre === "") return;
        const genreName = g.genre[0].toLocaleUpperCase() + g.genre.substring(1);
        return (
          <Button
            key={g.id}
            asChild
            variant={g.id === activeGenre ? "default" : "ghost"}
          >
            <Link href={`?genre=${g.id}`}>{genreName}</Link>
          </Button>
        );
      })}
    </div>
  );
}

export default GenreFilter;
