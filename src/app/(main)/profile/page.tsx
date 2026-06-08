import Link from "next/link";
import { Bookmark, Eye, Heart, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFavoriteMovies, getFavoritesCount } from "@/lib/favorites";
import { getWatchListCount, getWatchListMovies } from "@/lib/watchlist";
import { WatchStatus } from "@/generated/prisma/enums";
import { FilmDetail } from "@/shared/types/api.types";
import { ProfileTab } from "@/shared/types/profile.types";
import { SortKey } from "@/shared/types/search.types";
import { sortSet } from "@/shared/constants/sorts";
import ProfileMovies from "@/app/(main)/profile/_components/ProfileMovies";
import ProfileSettings from "@/app/(main)/profile/_components/profile-settings";

const tabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "favorites", label: "Избранное" },
  { id: "watched", label: "Просмотренные" },
  { id: "watchlist", label: "Хочу посмотреть" },
  { id: "settings", label: "Настройки" },
];

const tabSet = new Set<ProfileTab>(tabs.map((tab) => tab.id));

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

  const [favoritesCount, watchedCount, plannedCount] = await Promise.all([
    getFavoritesCount(),
    getWatchListCount({ status: WatchStatus.WATCHED }),
    getWatchListCount({ status: WatchStatus.PLANNED }),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-1 py-2 sm:px-3 lg:px-6">
      <ProfileHeader
        name={session.user.name}
        email={session.user.email}
        image={session.user.image ?? null}
        favoritesCount={favoritesCount}
        watchedCount={watchedCount}
        plannedCount={plannedCount}
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
  favoritesCount,
  watchedCount,
  plannedCount,
}: {
  name: string;
  email: string;
  image: string | null;
  favoritesCount: number;
  watchedCount: number;
  plannedCount: number;
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
        <Button variant="outline" className="w-full sm:w-fit">
          <Pencil size={16} />
          Редактировать
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
          <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Eye size={18} />
          </div>
          <div className="text-3xl font-bold">{watchedCount}</div>
          <div className="mt-1 text-sm text-muted-foreground">Просмотрено</div>
        </div>
        <div className="rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
          <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Heart size={18} />
          </div>
          <div className="text-3xl font-bold">{favoritesCount}</div>
          <div className="mt-1 text-sm text-muted-foreground">В избранном</div>
        </div>
        <div className="rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5">
          <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bookmark size={18} />
          </div>
          <div className="text-3xl font-bold">{plannedCount}</div>
          <div className="mt-1 text-sm text-muted-foreground">В планах</div>
        </div>
      </div>
    </section>
  );
}

function ProfileTabs({ activeTab }: { activeTab: ProfileTab }) {
  return (
    <nav className="flex gap-2 overflow-x-auto rounded-4xl bg-muted/50 p-1">
      {tabs.map((tab) => (
        <Button
          asChild
          className={cn(
            "h-10 rounded-4xl px-4",
            activeTab === tab.id && "shadow-sm",
          )}
          key={tab.id}
          variant={activeTab === tab.id ? "secondary" : "ghost"}
        >
          <Link
            href={
              tab.id === "favorites" ? "/profile" : `/profile?tab=${tab.id}`
            }
          >
            {tab.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
