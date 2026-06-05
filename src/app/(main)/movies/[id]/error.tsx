"use client";

import { useEffect } from "react";
import { CircleAlert, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-12">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 grid size-20 place-items-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlert className="size-10" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-destructive">
          Ошибка
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Не удалось загрузить фильм
        </h1>
        <p className="mb-8 text-muted-foreground">
          Попробуйте загрузить страницу еще раз или вернитесь на главную.
        </p>
        {error.digest ? (
          <p className="mb-8 text-muted-foreground">{error.digest}</p>
        ) : (
          ""
        )}
        <div className="flex items-center gap-3">
          <Button onClick={() => unstable_retry()}>
            <RotateCcw />
            Повторить
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
