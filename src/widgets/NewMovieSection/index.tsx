import { getFilmPremieres } from "@/shared/api/premieres";
import InfiniteGrid from "@/widgets/NewMovieSection/InfiniteGrid";
import { getPremieresItems } from "@/shared/lib/array";

export async function NewMovieSection() {
  const { items } = await getFilmPremieres();
  const premierItems = getPremieresItems(items, items.length);
  return <InfiniteGrid items={premierItems} />;
}
