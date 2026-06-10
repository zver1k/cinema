"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LockKeyhole, LogOut, Pencil, User } from "lucide-react";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useActionState, useEffect } from "react";
import { FormState, updateProfile } from "@/app/(main)/profile/actions";
import { changeEmail, changePassword, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newEmail = z.object({
  email: z.email("Неверный Email"),
});

const newPassword = z
  .object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export default function ProfileSettings({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: zodResolver(newEmail),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm({
    resolver: zodResolver(newPassword),
  });

  const onSubmitEmail = async (formData: z.infer<typeof newEmail>) => {
    const { data, error } = await changeEmail({
      newEmail: formData.email,
      callbackURL: "/profile?tab=settings",
    });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("Успешно!");
    }
  };

  const onSubmitPassword = async (formData: z.infer<typeof newPassword>) => {
    const { data, error } = await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("Успешно!");
    }
  };

  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  useEffect(() => {
    if (state.success) toast.success("Новый никнейм сохранён");
  }, [state]);
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col gap-4">
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User size={18} />
              Аккаунт
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <form action={formAction}>
              <div className="grid gap-2">
                <Label>Никнейм</Label>
                <Input id="name" name="name" type="text" defaultValue={name} />
                <p className="min-h-5 text-sm text-red-500">{state.error}</p>
              </div>
              <Button
                disabled={pending}
                type="submit"
                variant="outline"
                className="w-full sm:w-fit"
              >
                <Pencil size={16} />
                Сменить никнейм
              </Button>
            </form>
            <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  {...registerEmail("email")}
                  id="email"
                  type="email"
                  defaultValue={email}
                />

                <p className="min-h-5 text-sm text-red-500">
                  {emailErrors.email?.message}
                </p>
              </div>
              <Button
                disabled={isEmailSubmitting}
                type="submit"
                variant="outline"
                className="w-full sm:w-fit"
              >
                <Pencil size={16} />
                Сменить Email
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <LockKeyhole size={18} />
              Безопасность
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
              <div className="grid gap-2">
                <Label>Текущий пароль</Label>
                <Input
                  {...registerPassword("currentPassword")}
                  id="currentPassword"
                  type="password"
                />
                <p className="min-h-5 text-sm text-red-500">
                  {passwordErrors.currentPassword?.message}
                </p>
                <Label>Новый пароль</Label>
                <Input
                  {...registerPassword("newPassword")}
                  id="newPassword"
                  type="password"
                />
                <p className="min-h-5 text-sm text-red-500">
                  {passwordErrors.newPassword?.message}
                </p>
                <Label>Подтвердите пароль</Label>
                <Input
                  {...registerPassword("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                />
                <p className="min-h-5 text-sm text-red-500">
                  {passwordErrors.confirmPassword?.message}
                </p>
              </div>
              <Button
                disabled={isPasswordSubmitting}
                type="submit"
                variant="outline"
                className="w-full sm:w-fit"
              >
                <Pencil size={16} />
                Сменить пароль
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="p-3">
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

        <Card className="gap-4 p-3">
          <CardContent className="text-center p-6">
            <Button
              variant="destructive"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              <LogOut size={16} />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
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
