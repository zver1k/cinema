import { getCollection } from "@/shared/api/collection";
import Image from "next/image";
import { getRandomItems } from "@/shared/lib/array";

async function AuthSection() {
  const { items = [] } = await getCollection("TOP_250_MOVIES");
  const randomItems = getRandomItems(items, 30);
  return (
    <div className="relative hidden w-1/2 overflow-hidden lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_40%),linear-gradient(to_bottom,var(--card),var(--background))]" />

      <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-10">
        {randomItems.map((item) => (
          <Image
            key={item.kinopoiskId}
            src={item.posterUrlPreview}
            alt={item.nameRu || item.nameEn || "Постер"}
            width={300}
            height={400}
            className="aspect-2/3 rounded-xl border border-border bg-card"
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full items-end p-10">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Тысячи фильмов и сериалов в одной библиотеке
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Сохраняйте любимое, отслеживайте просмотренное, делитесь подборками
            с друзьями.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthSection;
