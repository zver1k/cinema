import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
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
import ProfileCount from "@/app/(main)/profile/_components/profile-count";
import {
  ProfileTabs,
  tabSet,
} from "@/app/(main)/profile/_components/profile-tabs";
import { Suspense } from "react";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
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
      <ProfileHeader
        name={session.user.name}
        email={session.user.email}
        image={session.user.image ?? null}
      />
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

function ProfileHeader({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  return (
    <section className="rounded-4xl bg-muted/60 p-4 ring-1 ring-foreground/5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Avatar className="size-18 text-xl sm:size-22" size="lg">
            <AvatarImage src={image || undefined} alt={name} />
            <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground sm:text-2xl">
              {name.toLocaleUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-bold tracking-tight sm:text-5xl">
              {name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {email}
            </p>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="mt-6 h-16 animate-pulse rounded-3xl bg-muted" />
        }
      >
        <ProfileCount />
      </Suspense>
    </section>
  );
}
