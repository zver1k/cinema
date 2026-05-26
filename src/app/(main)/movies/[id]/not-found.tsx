import Link from "next/link";

import BackButton from "@/shared/ui/back-button";
import { Button } from "@/shared/ui/button";
import { Film } from "lucide-react";

export default function MovieNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-12">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 grid size-20 place-items-center rounded-full bg-muted text-primary">
          <Film className="size-10" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Фильм не найден
        </h1>
        <p className="mb-8 text-muted-foreground">
          Возможно, фильм был удален или ссылка больше не актуальна.
        </p>
        <div className="flex items-center gap-3">
          <BackButton />
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
