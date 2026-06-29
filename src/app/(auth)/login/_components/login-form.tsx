"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";
import ForgotPassword from "@/app/(auth)/login/_components/forgot-password";
import PasswordInput from "@/shared/ui/password-input";

const loginSchema = z.object({
  email: z.email("Неверный Email или пароль"),
  password: z.string("Неверный Email или пароль"),
});

function LoginForm() {
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
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <PasswordInput {...register("password")} id="password" />
          <FieldError>{errors.password?.message}</FieldError>
          <div className="flex items-center justify-between gap-3">
            <FieldDescription>Минимум 8 символов</FieldDescription>
            <ForgotPassword />
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
