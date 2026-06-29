import InfiniteGrid from "@/widgets/NewMovieSection/InfiniteGrid";
import { getPremieresItems } from "@/shared/lib/array";
import { getFilmPremieres } from "@/shared/api/premieres";

export async function NewMovieSection() {
  const { items } = await getFilmPremieres();
  const premierItems = getPremieresItems(items, items.length);
  return <InfiniteGrid items={premierItems} />;
}
