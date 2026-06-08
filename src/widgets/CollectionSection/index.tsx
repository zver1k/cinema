import { CollectionType } from "@/shared/types/api.types";
import CollectionSwiper from "@/shared/ui/collection-swiper";
import { getCollection } from "@/shared/api/collection";
import { AuroraText } from "@/shared/ui/aurora-text";
import Link from "next/link";

async function CollectionSection({
  type,
  title,
  eagerFirstImage = false,
  href,
}: {
  type: CollectionType;
  title: string;
  eagerFirstImage?: boolean;
  href?: string;
}) {
  const { items = [] } = await getCollection(type);
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div className="flex justify-between items-center">
        <AuroraText
          colors={["#9ca8ab", "#005f5a", "#0092b8"]}
          className="text-4xl m-2 font-bold"
        >
          {title}
        </AuroraText>
        {href && <Link href={href}>Смотреть все</Link>}
      </div>

      <CollectionSwiper items={items} eagerFirstImage={eagerFirstImage} />
    </div>
  );
}

export default CollectionSection;
