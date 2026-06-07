import { getRandomItems } from "@/shared/lib/array";
import { Fragment } from "react";
import { Separator } from "@/shared/ui/separator";
import { getFilmFacts } from "@/shared/api/facts";
import { Skeleton } from "@/shared/ui/skeleton";

export function FilmFactsSkeleton() {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

async function FilmFacts({ id }: { id: string }) {
  const { items } = await getFilmFacts(id);
  if (items.length === 0) return null;
  const itemsRandom = getRandomItems(items, 5);
  return (
    <div className="mt-4">
      <div className="mb-3 font-semibold">Факты и ляпы</div>
      <div className="flex flex-col gap-2">
        {itemsRandom.map((f, i) => (
          <Fragment key={i}>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: f.text.replace(/<\/?a[^>]*>/g, ""),
              }}
            />
            {i < items.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FilmFacts;
