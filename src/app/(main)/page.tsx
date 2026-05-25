import CollectionSection from "@/widgets/CollectionSection";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <CollectionSection type={"TOP_250_MOVIES"} title={"Топ 250 фильмов"} />
      <CollectionSection type={"TOP_250_TV_SHOWS"} title={"Топ 250 сериалов"} />
    </div>
  );
}
