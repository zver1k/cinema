import CollectionSection from "@/widgets/CollectionSection";
import { connection } from "next/server";
import { collectionData } from "@/shared/constants/collections";

export default async function Home() {
  await connection();

  return (
    <div className="flex flex-col gap-2">
      {collectionData.map((c, i) => {
        return (
          <CollectionSection
            key={c.slug}
            type={c.type}
            title={c.title}
            eagerFirstImage={i === 0}
            href={`/top?type=${c.slug}`}
          />
        );
      })}
    </div>
  );
}
