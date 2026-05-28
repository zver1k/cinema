"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { resetPassword } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const passwordSchema = z.object({
  password: z.string().min(8, "Минимум 8 символов"),
});

function ResetPasswordForm({ token }: { token?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  const router = useRouter();
  const onSubmit = async (formData: z.infer<typeof passwordSchema>) => {
    const { data, error } = await resetPassword({
      newPassword: formData.password,
      token,
    });
    if (error) {
      toast(`Неверный  пароль`);
    }
    if (data) {
      toast("Вы успешно сменили пароль");
      router.push("/login");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <div className="relative">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
              type="button"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <p className="text-sm text-red-500">{errors.password?.message}</p>
          <div className="flex items-center justify-between gap-3">
            <FieldDescription>Минимум 8 символов</FieldDescription>
          </div>
        </Field>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          Сменить пароль
        </Button>
      </FieldGroup>
    </form>
  );
}

export default ResetPasswordForm;
