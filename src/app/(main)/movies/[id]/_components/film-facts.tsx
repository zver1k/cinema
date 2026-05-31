import { TFilmFacts } from "@/shared/types/api.types";
import { getRandomItems } from "@/shared/lib/array";
import { Fragment } from "react";
import { Separator } from "@/shared/ui/separator";

function FilmFacts({ facts }: { facts: TFilmFacts[] }) {
  if (facts.length === 0) return null;
  const items = getRandomItems(facts, 2);
  return (
    <div className="mt-4">
      <div className="mb-3 font-semibold">Факты и ляпы</div>
      <div className="flex flex-col gap-2">
        {items.map((f, i) => (
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
