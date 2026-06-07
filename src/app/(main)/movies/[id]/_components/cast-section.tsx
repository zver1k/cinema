import { getCastById } from "@/shared/api/cast";
import CastList from "@/app/(main)/movies/[id]/_components/cast-list";
import { PROFESSION_LABELS } from "@/shared/constants/staff";
import { Staff } from "@/shared/types/api.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import CastItem from "@/app/(main)/movies/[id]/_components/cast-item";
import { Skeleton } from "@/shared/ui/skeleton";

export function CastSectionSkeleton() {
  return (
    <div className="mb-9">
      <Skeleton className="h-5 w-32 mb-9" />
      <div className="flex flex-col gap-2">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-5 w-32 mb-9 mt-9" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="size-20 rounded-full" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function CastSection({ id }: { id: string }) {
  const cast = await getCastById(id);
  const castActors = cast.filter((c) => c.professionKey === "ACTOR");
  const castDirectors = cast.filter((c) => c.professionKey === "DIRECTOR");
  const grouped = cast.reduce(
    (acc, item) => {
      const key = item.professionKey;
      if (key === "ACTOR" || key === "DIRECTOR" || !PROFESSION_LABELS[key]) {
        return acc;
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, Staff[]>,
  );

  if (castActors.length === 0) return null;
  if (castDirectors.length === 0) return null;
  return (
    <div className="mb-9">
      {castDirectors.length > 0 && (
        <div className="mb-9">
          <h3 className="mb-3.5 text-[18px] font-semibold">
            {castDirectors.length === 1 ? "Режиссёр" : "Режиссёры"}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
            {castDirectors.map((d) => (
              <CastItem key={d.staffId} member={d} />
            ))}
          </div>
        </div>
      )}
      <h3 className="mb-3.5 text-[18px] font-semibold">В ролях</h3>
      <CastList actors={castActors} />

      <h3 className="mb-3.5 text-[18px] font-semibold">Над фильмом работали</h3>
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(grouped).map(([key, members]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>
              {PROFESSION_LABELS[key as keyof typeof PROFESSION_LABELS]}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {members.map((m) => (
                  <div key={m.staffId} className="text-sm">
                    <span className="font-medium">
                      {m.nameRu ?? m.nameEn ?? m.professionText}
                    </span>
                    {m.description && (
                      <span className="text-muted-foreground">
                        {" "}
                        — {m.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CastSection;
