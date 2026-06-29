"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import PasswordInput from "@/shared/ui/password-input";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Никнейм должен быть более 3 символов")
    .max(20, "Никнейм должен быть не более 20 символов"),
  password: z
    .string()
    .min(8, "Пароль должен быть более 8 символов")
    .max(60, "Пароль должен быть не более 60 символов"),
  email: z.email("Неверный адрес электронной почты"),
  terms: z.literal(true, { error: "Необходимо принять условия" }),
});

function strengthPassword(password: string): number {
  if (password.length === 0) return 0;
  else if (password.length < 8) return 1;
  else if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) return 3;
  return 2;
}

function RegisterForm() {
  "use no memo";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const { refetch } = useSession();
  const password = watch("password") ?? "";
  const strength = strengthPassword(password);
  const onSubmit = async (formData: z.infer<typeof registerSchema>) => {
    const { data, error } = await signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      toast(`Ошибка при регистрации: ${error.message}`);
    }
    if (data) {
      toast("Вы успешно зарегистрировались!");
      await refetch();
      router.refresh();
      router.replace("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="name">Никнейм</FieldLabel>
          <Input {...register("name")} id="name" type="text" />
          <FieldDescription>3-20 символов, латиница и цифры</FieldDescription>
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email")} id="email" type="email" />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <PasswordInput {...register("password")} id="password" />
          <FieldError>{errors.password?.message}</FieldError>
          <div className="flex gap-1">
            <div
              className={`h-1 flex-1 rounded-full ${strength >= 1 ? "bg-red-500" : "bg-muted"}`}
            />
            <div
              className={`h-1 flex-1 rounded-full ${strength >= 2 ? "bg-yellow-500" : "bg-muted"}`}
            />
            <div
              className={`h-1 flex-1 rounded-full ${strength >= 3 ? "bg-green-500" : "bg-muted"}`}
            />
          </div>
        </Field>

        <Field orientation="horizontal" className="items-start gap-3">
          <input
            {...register("terms")}
            id="terms"
            type="checkbox"
            className="mt-0.5 size-4 rounded border-border accent-primary"
          />

          <FieldContent>
            <Label
              htmlFor="terms"
              className="cursor-pointer text-xs leading-5 font-normal text-muted-foreground"
            >
              Я согласен с условиями использования и обработкой персональных
              данных
            </Label>
          </FieldContent>
        </Field>
        <FieldError>{errors.terms?.message}</FieldError>
        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={isSubmitting}
        >
          Создать аккаунт
        </Button>
      </FieldGroup>
    </form>
  );
}

export default RegisterForm;
