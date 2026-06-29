import { ThumbsDown, ThumbsUp } from "lucide-react";
import { reviewTypeStyles, reviewTypeText } from "@/shared/lib/reviews";
import { ScrollArea } from "@/shared/ui/scroll-area";
import dayjs from "dayjs";
import { Reviews } from "@/shared/types/api.types";

function ReviewCard({ review }: { review: Reviews }) {
  const dateNormal = dayjs(review.date).format("DD.MM.YYYY");
  const text = review.description.replace(/<[^>]*>/g, "");
  return (
    <div className="mb-3.5 rounded-[14px] border border-border muted-foreground p-4.5">
      <div className="mb-2.5 flex items-center gap-3">
        <div>
          <div className="text-[14px] font-semibold">{review.author}</div>
          <div className="text-[12px]">{dateNormal}</div>
        </div>
        <div className="ml-auto inline-flex gap-2 text-[14px] font-bold">
          <div className="text-green-500">
            <ThumbsUp />
          </div>
          <span> {review.positiveRating}</span>
          <div className="text-red-500">
            <ThumbsDown />
          </div>
          <span> {review.negativeRating}</span>
        </div>
      </div>
      <div>
        <span
          className={`mb-2 inline-block rounded-lg px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.04em] ${reviewTypeStyles[review.type]}`}
        >
          {reviewTypeText[review.type]}
        </span>
      </div>
      <ScrollArea className="text-[14px] leading-[1.6] mt-2 h-50 w-full rounded-md border p-4">
        {text}
      </ScrollArea>
    </div>
  );
}

export default ReviewCard;
