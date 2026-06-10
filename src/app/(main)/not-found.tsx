import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-xl text-center">
        <div className="mb-6 text-8xl font-black tracking-tight text-primary/90">
          404
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
          Фильм или персона не найдены
        </h1>
        <p className="mb-8 text-base leading-7 text-muted-foreground sm:text-lg">
          Возможно, страница была удалена, ссылка устарела или такого фильма ещё
          нет в базе.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:scale-[1.02] hover:opacity-90"
          >
            На главную
          </Link>
          <Link
            href="/movies"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-medium transition hover:bg-accent"
          >
            Каталог фильмов
          </Link>
        </div>
      </div>
    </div>
  );
}
