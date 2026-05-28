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
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email("Не верный Email или пароль"),
  password: z.string("Не верный Email или пароль"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      toast(`Не верный Email или пароль`);
    }
    if (data) {
      toast("Вы успешно авторизовались!");
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="login">Email</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="text"
            placeholder="damir@example.com"
          />
          <p>{errors.email?.message}</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Минимум 8 символов"
          />
          <p>{errors.password?.message}</p>
          <div className="flex items-center justify-between gap-3">
            <FieldDescription>Минимум 8 символов</FieldDescription>
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/login">Забыли?</Link>
            </Button>
          </div>
        </Field>

        <Button type="submit" size="lg" className="w-full">
          Войти
        </Button>
      </FieldGroup>
    </form>
  );
}

export default LoginForm;
