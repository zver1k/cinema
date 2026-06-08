import { getFilmPremieres } from "@/shared/api/premieres";
import InfiniteGrid from "@/widgets/NewMovieSection/InfiniteGrid";

export async function NewMovieSection() {
  const { items } = await getFilmPremieres();

  return <InfiniteGrid items={items} />;
}
