import Link from "next/link";

import { Button } from "@/shared/ui/button";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import LoginForm from "@/app/(auth)/login/_components/login-form";

function Page() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex w-full items-center justify-center px-4 py-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link href="/" className="block w-fit">
            <SidebarHeader />
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">С возвращением</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Войдите, чтобы продолжить смотреть, оценивать и собирать свои
            коллекции.
          </p>

          <LoginForm />

          <div className="mt-5 text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/register">Зарегистрироваться</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_40%),linear-gradient(to_bottom,var(--card),var(--background))]" />

        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 rounded-xl border border-border bg-card"
            />
          ))}
        </div>

        <div className="relative z-10 flex h-full items-end p-10">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Тысячи фильмов и сериалов в одной библиотеке
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Сохраняйте любимое, отслеживайте просмотренное, делитесь
              подборками с друзьями.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
