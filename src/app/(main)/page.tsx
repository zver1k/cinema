import CollectionSection from "@/widgets/CollectionSection";
import { connection } from "next/server";

export default async function Home() {
  await connection();

  return (
    <div className="flex flex-col gap-2">
      <CollectionSection
        type={"TOP_250_MOVIES"}
        title={"Топ 250 фильмов"}
        eagerFirstImage
        href={`/top?type=movies`}
      />
      <CollectionSection
        type={"TOP_250_TV_SHOWS"}
        title={"Топ 250 сериалов"}
        href={`/top?type=tv-shows`}
      />
    </div>
  );
}
