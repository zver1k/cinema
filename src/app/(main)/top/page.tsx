import { getCollection } from "@/shared/api/collection";
import TopGrid from "@/app/(main)/top/_components/top-grid";
import { AuroraText } from "@/shared/ui/aurora-text";
import { collectionData } from "@/shared/constants/collections";

async function TopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const collection =
    collectionData.find((c) => c.slug === type) ?? collectionData[0];
  const { items, totalPages } = await getCollection(collection.type);
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <AuroraText
        colors={["#9ca8ab", "#005f5a", "#0092b8"]}
        className="m-2 text-3xl font-bold sm:text-4xl"
      >
        {collection.title}
      </AuroraText>
      <TopGrid
        initialItems={items}
        totalPages={totalPages}
        type={collection.type}
      />
    </div>
  );
}

export default TopPage;
