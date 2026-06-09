"use client";

import { useState } from "react";
import { FilmDetail } from "@/shared/types/api.types";
import { ProfileTab } from "@/shared/types/profile.types";
import { SortKey, ViewMode } from "@/shared/types/search.types";
import { Button } from "@/shared/ui/button";
import { Grid2X2, ListFilter } from "lucide-react";
import MovieGrid from "@/shared/ui/movie-grid";
import EmptyMovieSection from "@/app/(main)/profile/_components/empty-movie-section";
import { emptyStates } from "@/shared/constants/empty";
import SortSelect from "@/app/(main)/profile/_components/sort-select";

function ProfileMovies({
  films,
  activeTab,
  activeSort,
}: {
  films: FilmDetail[];
  activeTab: Exclude<ProfileTab, "settings">;
  activeSort: SortKey;
}) {
  const [view, setView] = useState<ViewMode>("grid");
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => setView("grid")}
            variant={view === "grid" ? "secondary" : "ghost"}
          >
            <Grid2X2 size={16} />
            Сетка
          </Button>
          <Button
            onClick={() => setView("list")}
            variant={view === "list" ? "secondary" : "ghost"}
          >
            <ListFilter size={16} />
            Список
          </Button>
        </div>
        <SortSelect activeTab={activeTab} activeSort={activeSort} />
      </div>
      {films.length > 0 ? (
        <MovieGrid films={films} view={view} />
      ) : (
        <EmptyMovieSection {...emptyStates[activeTab]} />
      )}
    </>
  );
}

export default ProfileMovies;
