import { CollectionType } from "@/shared/types/api.types";
import CollectionSwiper from "@/shared/ui/collection-swiper";
import { getCollection } from "@/shared/api/collection";
import { AuroraText } from "@/shared/ui/aurora-text";

async function CollectionSection({
  type,
  title,
  eagerFirstImage = false,
}: {
  type: CollectionType;
  title: string;
  eagerFirstImage?: boolean;
}) {
  const { items = [] } = await getCollection(type);
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <AuroraText
        colors={["#9ca8ab", "#005f5a", "#022f2e", "#0092b8"]}
        className="text-4xl m-2"
      >
        {title}
      </AuroraText>
      <CollectionSwiper items={items} eagerFirstImage={eagerFirstImage} />
    </div>
  );
}

export default CollectionSection;
