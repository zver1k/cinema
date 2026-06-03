import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import LoginForm from "@/app/(auth)/login/_components/login-form";
import AuthSection from "@/widgets/AuthSection";

export const dynamic = "force-dynamic";

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

          <Suspense>
            <LoginForm />
          </Suspense>

          <div className="mt-5 text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/register">Зарегистрироваться</Link>
            </Button>
          </div>
        </div>
      </div>

      <AuthSection />
    </div>
  );
}

export default Page;
