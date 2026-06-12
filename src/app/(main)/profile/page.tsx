import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFavoriteMovies } from "@/lib/favorites";
import { getWatchListMovies } from "@/lib/watchlist";
import { WatchStatus } from "@/generated/prisma/enums";
import { FilmDetail } from "@/shared/types/api.types";
import { ProfileTab } from "@/shared/types/profile.types";
import { SortKey } from "@/shared/types/search.types";
import { sortSet } from "@/shared/constants/sorts";
import ProfileMovies from "@/app/(main)/profile/_components/profile-movies";
import ProfileSettings from "@/app/(main)/profile/_components/profile-settings";
import {
  ProfileTabs,
  tabSet,
} from "@/app/(main)/profile/_components/profile-tabs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/app/(main)/profile/_components/profile-header";
import { Suspense } from "react";
import ProfileCount from "@/app/(main)/profile/_components/profile-count";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/login");
  const { tab, sort } = await searchParams;
  const activeSort = sortSet.has(sort as SortKey) ? (sort as SortKey) : "name";
  const activeTab = tabSet.has(tab as ProfileTab)
    ? (tab as ProfileTab)
    : "favorites";
  let films: FilmDetail[] = [];
  switch (activeTab) {
    case "favorites":
      films = await getFavoriteMovies();
      break;
    case "watched":
      films = await getWatchListMovies({ status: WatchStatus.WATCHED });
      break;
    case "watchlist":
      films = await getWatchListMovies({ status: WatchStatus.PLANNED });
      break;
    default:
      break;
  }

  const comparators: Record<SortKey, (a: FilmDetail, b: FilmDetail) => number> =
    {
      name: (a, b) => (a.nameRu ?? "").localeCompare(b.nameRu ?? "", "ru"),
      year: (a, b) => (b.year ?? 0) - (a.year ?? 0),
      rating: (a, b) => (b.ratingKinopoisk ?? 0) - (a.ratingKinopoisk ?? 0),
    };
  films.sort(comparators[activeSort]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-1 py-2 sm:px-3 lg:px-6">
      <section className="rounded-4xl bg-muted/60 p-4 ring-1 ring-foreground/5 sm:p-6">
        <ProfileHeader
          name={session.user.name}
          email={session.user.email}
          image={session.user.image ?? null}
        />
        <Suspense
          fallback={
            <div className="mt-6 h-16 animate-pulse rounded-3xl bg-muted" />
          }
        >
          <ProfileCount />
        </Suspense>
      </section>

      <ProfileTabs activeTab={activeTab} />

      {activeTab !== "settings" && (
        <ProfileMovies
          films={films}
          activeTab={activeTab}
          activeSort={activeSort}
        />
      )}

      {activeTab === "settings" && (
        <ProfileSettings name={session.user.name} email={session.user.email} />
      )}
    </div>
  );
}
