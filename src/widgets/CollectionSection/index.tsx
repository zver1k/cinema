import { CollectionType } from "@/shared/types/api.types";
import CollectionSwiper from "@/shared/ui/collection-swiper";
import { getCollection } from "@/shared/api/collection";

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
      <h2 className="text-4xl text-center m-2">{title}</h2>
      <CollectionSwiper items={items} eagerFirstImage={eagerFirstImage} />
    </div>
  );
}

export default CollectionSection;
