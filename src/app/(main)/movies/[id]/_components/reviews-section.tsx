import { getReviewsById } from "@/shared/api/review";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import ReviewCard from "@/app/(main)/movies/[id]/_components/review-card";

async function ReviewsSection({ id }: { id: string }) {
  const reviews = await getReviewsById(id);
  if (reviews.total === 0) return null;
  return (
    <div className="mb-9">
      <h3 className="mb-3.5 text-[18px] font-semibold">Рецензии</h3>
      {reviews.items.slice(0, 1).map((r) => {
        return <ReviewCard key={r.kinopoiskId} review={r} />;
      })}
      <Button asChild variant={"outline"} className="mt-3">
        <Link href={`/movies/${id}/reviews`}>Показать все рецензии </Link>
      </Button>
    </div>
  );
}

export default ReviewsSection;
