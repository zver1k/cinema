"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import BackButton from "@/shared/ui/back-button";
import { Suspense } from "react";
import LoginForm from "@/app/(auth)/login/_components/login-form";
import RegisterButton from "@/app/(auth)/login/_components/register-button";

function LoginModalClient() {
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={() => router.back()}
    >
      <div
        className="relative flex flex-col items-center p-3 md:flex-row w-full max-w-150 max-h-[90dvh] overflow-hidden rounded-3xl border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          aria-label="Закрыть модальное окно"
          className="absolute right-3 top-3 z-10 bg-black/40 text-white hover:bg-black/60"
          size="icon-sm"
          variant="ghost"
          onClick={() => router.back()}
        >
          <X size={16} />
        </Button>
        <div className="w-full max-w-md">
          <BackButton />
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Войдите, чтобы продолжить смотреть, оценивать и собирать свои
            коллекции.
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <RegisterButton />
        </div>
      </div>
    </div>
  );
}

export default LoginModalClient;
