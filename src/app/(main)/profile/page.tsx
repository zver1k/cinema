import Link from "next/link";
import {
  Bell,
  Bookmark,
  Check,
  Eye,
  Grid2X2,
  Heart,
  ListFilter,
  LockKeyhole,
  LogOut,
  Mail,
  Pencil,
  User,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";

type ProfileTab = "favorites" | "watched" | "watchlist" | "settings";

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
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tabSet.has(tab as ProfileTab)
    ? (tab as ProfileTab)
    : "favorites";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-1 py-2 sm:px-3 lg:px-6">
      <ProfileHeader />
      <ProfileTabs activeTab={activeTab} />

      {activeTab === "favorites" && (
        <EmptyMovieSection
          icon={Heart}
          title="В избранном пока пусто"
          description="Здесь появятся фильмы, которые пользователь добавит в избранное."
        />
      )}
      {activeTab === "watched" && <WatchedSkeleton />}
      {activeTab === "watchlist" && (
        <EmptyMovieSection
          icon={Bookmark}
          title="Список «хочу посмотреть» пуст"
          description="Здесь будет очередь фильмов и сериалов на потом."
        />
      )}
      {activeTab === "settings" && <ProfileSettings />}
    </div>
  );
}

function ProfileHeader() {
  const stats = [
    { label: "Просмотрено", icon: Eye },
    { label: "В избранном", icon: Heart },
    { label: "В планах", icon: Bookmark },
  ];

  return (
    <section className="rounded-4xl bg-muted/60 p-4 ring-1 ring-foreground/5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Avatar className="size-18 text-xl sm:size-22" size="lg">
            <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground sm:text-2xl">
              U
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-bold tracking-tight sm:text-5xl">
              Профиль
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Данные пользователя можно подключить здесь позже.
            </p>
          </div>
        </div>
        <Button variant="outline" className="w-full sm:w-fit">
          <Pencil size={16} />
          Редактировать
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="rounded-3xl bg-card/80 p-4 ring-1 ring-foreground/5"
              key={stat.label}
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={18} />
              </div>
              <div className="text-3xl font-bold">0</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          );
        })}
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

function EmptyMovieSection({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <MovieToolbar />
      <Card className="items-center justify-center p-10 text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon size={22} />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-110 text-sm text-muted-foreground">{description}</p>
      </Card>
    </section>
  );
}

function MovieToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex gap-2">
        <Button variant="secondary">
          <Grid2X2 size={16} />
          Сетка
        </Button>
        <Button variant="ghost">
          <ListFilter size={16} />
          Список
        </Button>
      </div>
      <div className="sm:ml-auto">
        <Button variant="outline">Сортировка</Button>
      </div>
    </div>
  );
}

function WatchedSkeleton() {
  const facts = [
    "За этот год",
    "Любимый жанр",
    "Часов в кино",
    "Средняя оценка",
  ];

  return (
    <section className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {facts.map((fact) => (
          <Card size="sm" className="gap-2 p-4" key={fact}>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {fact}
            </span>
            <div className="text-2xl font-bold">0</div>
          </Card>
        ))}
      </div>

      <EmptyMovieSection
        icon={Eye}
        title="Просмотренных пока нет"
        description="Здесь будет история просмотренных фильмов."
      />
    </section>
  );
}

function ProfileSettings() {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User size={18} />
              Аккаунт
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Имя" placeholder="Имя пользователя" />
            <Field label="Email" placeholder="email@example.com" type="email" />
            <Field label="Никнейм" placeholder="@username" />
            <Field label="Город" placeholder="Город" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Bell size={18} />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <SettingsToggle label="Премьеры в подборках" />
            <SettingsToggle label="Новые оценки у друзей" />
            <SettingsToggle label="Еженедельная рассылка" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <LockKeyhole size={18} />
              Приватность
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <SettingsToggle label="Показывать избранное" />
            <SettingsToggle label="Показывать оценки" />
            <SettingsToggle label="Скрыть просмотренные" />
          </CardContent>
        </Card>

        <Card className="gap-4">
          <CardContent className="flex flex-col gap-3 pt-6">
            <Button>
              <Check size={16} />
              Сохранить изменения
            </Button>
            <Button variant="outline">
              <Mail size={16} />
              Сменить почту
            </Button>
            <Button variant="destructive">
              <LogOut size={16} />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input placeholder={placeholder} type={type} />
    </div>
  );
}

function SettingsToggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl bg-muted/50 p-3">
      <span className="text-sm">{label}</span>
      <button
        aria-pressed={false}
        className="relative h-6 w-11 rounded-full bg-input transition"
        type="button"
      >
        <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition" />
      </button>
    </div>
  );
}
