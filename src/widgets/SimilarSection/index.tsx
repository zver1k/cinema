import CollectionSwiper from "@/shared/ui/collection-swiper";
import { getSimilarById } from "@/shared/api/similar";
import { miniSliderBreakpoints } from "@/shared/constants/slider-breakpoints";
import { Skeleton } from "@/shared/ui/skeleton";

export function SimilarSectionSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="aspect-2/3 w-full rounded-xl" />
      ))}
    </div>
  );
}

async function SimilarSection({ id }: { id: string }) {
  const { items = [] } = await getSimilarById(id);
  if (!items.length) return null;
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <h3 className="mb-3.5 text-[18px] font-semibold">Похожее</h3>
      <CollectionSwiper breakpoints={miniSliderBreakpoints} items={items} />
    </div>
  );
}

export default SimilarSection;
