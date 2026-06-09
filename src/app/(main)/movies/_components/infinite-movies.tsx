"use client";

import { ViewMode } from "@/shared/types/search.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/app/(main)/movies/actions";
import MovieGrid from "@/shared/ui/movie-grid";
import { Button } from "@/shared/ui/button";
import { useEffect, useRef } from "react";

function InfiniteMovies({
  view = "grid",
  keyword,
  type,
  genreID,
}: {
  view?: ViewMode;
  keyword?: string;
  type?: string;
  genreID?: number;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const result = useInfiniteQuery({
    queryKey: ["movies", keyword, type, genreID],
    queryFn: ({ pageParam }) =>
      fetchMovies({ page: pageParam, keyword, type, genreID }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = result;
  const unique =
    data?.pages
      .flatMap((p) => p.items ?? [])
      .filter(
        (f, i, self) =>
          self.findIndex((x) => x.kinopoiskId === f.kinopoiskId) === i,
      ) ?? [];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) void fetchNextPage();
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  return (
    <div>
      <MovieGrid films={unique} view={view} />
      {hasNextPage && (
        <div className="flex justify-center items-center pt-4">
          <Button
            onClick={() => fetchNextPage()}
            variant="default"
            disabled={isFetchingNextPage}
          >
            Загрузить ещё
          </Button>
        </div>
      )}
      <div ref={sentinelRef} />
    </div>
  );
}

export default InfiniteMovies;
