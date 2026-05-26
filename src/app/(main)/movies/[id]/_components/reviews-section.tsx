import { getReviewsById } from "@/shared/api/review";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/shared/ui/button";

async function ReviewsSection({ id }: { id: string }) {
  const review = await getReviewsById(id);
  return (
    <div>
      {review.items.slice(0, 1).map((r) => (
        <div
          key={r.kinopoiskId}
          className="mb-3.5 rounded-[14px] border border-border muted-foreground p-4.5"
        >
          <div className="mb-2.5 flex items-center gap-3">
            <div>
              <div className="text-[14px] font-semibold">{r.author}</div>
              <div className="text-[12px]">{r.date}</div>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 text-[14px] font-bold">
              <ThumbsUp /> {r.positiveRating} <ThumbsDown /> {r.negativeRating}
            </div>
          </div>
          <div>
            <span className="mb-2 inline-block rounded-lg px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.04em]">
              {r.type}
            </span>
          </div>
          <div className="text-[14px] leading-[1.6]" style={{ marginTop: 8 }}>
            {r.description.slice(0, 250)}...
          </div>
        </div>
      ))}
      <Button variant={"outline"} className="mt-3">
        Показать все рецензии
      </Button>
    </div>
  );
}

export default ReviewsSection;
