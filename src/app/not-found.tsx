import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-7xl font-bold text-primary">404</div>
        <h1 className="mb-3 text-2xl font-semibold text-foreground">
          Страница не найдена
        </h1>
        <p className="mb-6 text-muted-foreground">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
