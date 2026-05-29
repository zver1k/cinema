"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Неверный Email или пароль"),
  password: z.string("Неверный Email или пароль"),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      toast(`Неверный Email или пароль`);
    }
    if (data) {
      toast("Вы успешно авторизовались!");
      router.push(redirect || "/");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email")} id="email" type="email" />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <div className="relative">
            <Input
              className="pr-10"
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
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/forgot-password">Забыли?</Link>
            </Button>
          </div>
        </Field>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          Войти
        </Button>
      </FieldGroup>
    </form>
  );
}

export default LoginForm;
