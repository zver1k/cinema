import { getReviewsById } from "@/shared/api/review";
import BackButton from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { getFilmByIdSafe } from "@/shared/api/films";
import type { Metadata } from "next";
import ReviewCard from "@/app/(main)/movies/[id]/_components/review-card";
import { filmName } from "@/shared/lib/film-name";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const film = await getFilmByIdSafe(id);
  if (!film) return {};
  return {
    title: `Рецензии — ${filmName(film, "Фильм")}`,
    description: film.description,
    openGraph: {
      title: `Рецензии — ${filmName(film, "Фильм")}`,
      description: film.description ?? "",
      images: film.posterUrl ? [film.posterUrl] : [],
    },
  };
}

async function ReviewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const [film, reviews] = await Promise.all([
    getFilmByIdSafe(id),
    getReviewsById(id, currentPage),
  ]);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= reviews.totalPages;
  const paginationParams = (p: number) => `?page=${p}`;
  return (
    <div>
      <BackButton />
      <h3 className="mb-3.5 text-[18px] font-semibold">
        Рецензии {film?.nameRu ?? film?.nameOriginal}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reviews.items.map((r) => {
          return <ReviewCard key={r.kinopoiskId} review={r} />;
        })}
      </div>
      <div className="flex justify-between mt-4">
        {isFirst ? (
          <Button disabled variant="secondary">
            Назад
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={paginationParams(currentPage - 1)}>Назад</Link>
          </Button>
        )}
        {isLast ? (
          <Button disabled variant="secondary">
            Вперёд
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={paginationParams(currentPage + 1)}>Вперёд</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
