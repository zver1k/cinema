"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Никнейм должен быть более 3 символов")
    .max(20, "Никнейм должен быть не более 20 символов"),
  password: z
    .string()
    .min(8, "Пароль должен быть более 8 символов")
    .max(60, "Никнейм должен быть не более 60 символов"),
  email: z.email("Неверный адрес электронной почты"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
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
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="name">Никнейм</FieldLabel>
          <Input {...register("name")} id="name" type="text" />
          <FieldDescription>3-20 символов, латиница и цифры</FieldDescription>
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email")} id="email" type="email" />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input {...register("password")} id="password" type="password" />
          <p className="text-sm text-red-500">{errors.password?.message}</p>
          <div className="flex gap-1">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className="h-1 flex-1 rounded-full bg-chart-2" />
            <div className="h-1 flex-1 rounded-full bg-muted" />
          </div>
        </Field>

        <Field orientation="horizontal" className="items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            defaultChecked
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
