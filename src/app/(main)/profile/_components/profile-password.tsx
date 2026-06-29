"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LockKeyhole, Pencil } from "lucide-react";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { FieldError } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/lib/auth-client";
import { toast } from "sonner";
import { z } from "zod";

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

function ProfilePassword() {
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
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm({
    resolver: zodResolver(newPassword),
  });
  return (
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
            <FieldError>{passwordErrors.currentPassword?.message}</FieldError>
            <Label>Новый пароль</Label>
            <Input
              {...registerPassword("newPassword")}
              id="newPassword"
              type="password"
            />
            <FieldError>{passwordErrors.newPassword?.message}</FieldError>
            <Label>Подтвердите пароль</Label>
            <Input
              {...registerPassword("confirmPassword")}
              id="confirmPassword"
              type="password"
            />
            <FieldError>{passwordErrors.confirmPassword?.message}</FieldError>
          </div>
          <Button
            disabled={isPasswordSubmitting}
            type="submit"
            variant="outline"
            className="w-full mt-2 sm:w-fit"
          >
            <Pencil size={16} />
            Сменить пароль
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProfilePassword;
