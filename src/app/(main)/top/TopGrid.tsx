"use client";

import { CollectionType, MovieItem } from "@/shared/types/api.types";
import MovieGrid from "@/shared/ui/movie-grid";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTopMovies } from "@/app/(main)/top/actions";

function TopGrid({
  initialItems,
  totalPages,
  type,
}: {
  initialItems: MovieItem[];
  totalPages: number;
  type: CollectionType;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { hasNextPage, fetchNextPage, data } = useInfiniteQuery({
    queryKey: ["top", type],
    queryFn: ({ pageParam }) => fetchTopMovies({ page: pageParam, type }),
    initialData: {
      pages: [{ items: initialItems, totalPages, total: initialItems.length }],
      pageParams: [1],
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) void fetchNextPage();
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  return (
    <>
      <MovieGrid
        films={data?.pages.flatMap((p) => p.items ?? [])}
        view={"grid"}
      />
      <div ref={sentinelRef} />
    </>
  );
}

export default TopGrid;
