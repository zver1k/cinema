import Link from "next/link";

import { Button } from "@/shared/ui/button";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import RegisterForm from "@/app/(auth)/register/_components/register-form";
import AuthSection from "@/widgets/AuthSection";
import BackButton from "@/shared/ui/back-button";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex w-full items-center justify-center px-4 py-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <SidebarHeader />
          <BackButton />
          <h1 className="text-3xl font-bold tracking-tight">
            Создайте аккаунт
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Бесплатно. Без лишних писем.
          </p>

          <RegisterForm />

          <div className="mt-5 text-sm text-muted-foreground">
            Уже с нами?{" "}
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/login">Войти</Link>
            </Button>
          </div>
        </div>
      </div>

      <AuthSection />
    </div>
  );
}

export default Page;
