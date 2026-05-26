import { getReviewsById } from "@/shared/api/review";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { reviewTypeStyles, reviewTypeText } from "@/shared/lib/reviews";
import dayjs from "dayjs";
import { ScrollArea } from "@/shared/ui/scroll-area";

async function ReviewsSection({ id }: { id: string }) {
  const reviews = await getReviewsById(id);
  if (reviews.total === 0) return null;
  return (
    <div className="mb-9">
      <h3 className="mb-3.5 text-[18px] font-semibold">Рецензии</h3>
      {reviews.items.slice(0, 1).map((r) => {
        const date = dayjs(r.date);
        const review = r.description.replace(/<[^>]*>/g, "");
        return (
          <div
            key={r.kinopoiskId}
            className="mb-3.5 rounded-[14px] border border-border muted-foreground p-4.5"
          >
            <div className="mb-2.5 flex items-center gap-3">
              <div>
                <div className="text-[14px] font-semibold">{r.author}</div>
                <div className="text-[12px]">{date.format("DD.MM.YYYY")}</div>
              </div>
              <div className="ml-auto inline-flex gap-2 text-[14px] font-bold">
                <div className="text-green-500">
                  <ThumbsUp />
                </div>
                <span> {r.positiveRating}</span>
                <div className="text-red-500">
                  <ThumbsDown />
                </div>
                <span> {r.negativeRating}</span>
              </div>
            </div>
            <div>
              <span
                className={`mb-2 inline-block rounded-lg px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.04em] ${reviewTypeStyles[r.type]}`}
              >
                {reviewTypeText[r.type]}
              </span>
            </div>
            <ScrollArea className="text-[14px] leading-[1.6] mt-2 h-50 w-full rounded-md border p-4">
              {review}
            </ScrollArea>
          </div>
        );
      })}
      <Button variant={"outline"} className="mt-3">
        Показать все рецензии
      </Button>
    </div>
  );
}

export default ReviewsSection;
