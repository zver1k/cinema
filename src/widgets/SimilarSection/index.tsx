import CollectionSwiper from "@/shared/ui/collection-swiper";
import { getSimilarById } from "@/shared/api/similar";
import { miniSliderBreakpoints } from "@/shared/constants/slider-breakpoints";

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
