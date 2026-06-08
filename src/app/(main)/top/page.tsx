import { getCollection } from "@/shared/api/collection";
import TopGrid from "@/app/(main)/top/_components/top-grid";
import { AuroraText } from "@/shared/ui/aurora-text";

async function TopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const collectionType =
    type === "tv-shows" ? "TOP_250_TV_SHOWS" : "TOP_250_MOVIES";
  const title = type === "tv-shows" ? "Топ 250 сериалов" : "Топ 250 фильмов";
  const { items, totalPages } = await getCollection(collectionType);
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <AuroraText
        colors={["#9ca8ab", "#005f5a", "#0092b8"]}
        className="m-2 text-3xl font-bold sm:text-4xl"
      >
        {title}
      </AuroraText>
      <TopGrid
        initialItems={items}
        totalPages={totalPages}
        type={collectionType}
      />
    </div>
  );
}

export default TopPage;
