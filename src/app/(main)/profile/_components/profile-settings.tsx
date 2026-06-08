"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Bell, Check, LockKeyhole, LogOut, User } from "lucide-react";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useActionState } from "react";
import { FormState, updateProfile } from "@/app/(main)/profile/actions";

export default function ProfileSettings({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  return (
    <form action={formAction}>
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
              <div className="grid gap-2">
                <Label>Никнейм</Label>
                <Input id="name" name="name" type="text" defaultValue={name} />
                {state.error && (
                  <p className="text-sm text-red-500">{state.error}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                />
              </div>
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
              <Button disabled={pending} type="submit">
                <Check size={16} />
                Сохранить изменения
              </Button>
              <Button disabled={pending} variant="destructive">
                <LogOut size={16} />
                Выйти из аккаунта
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </form>
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
