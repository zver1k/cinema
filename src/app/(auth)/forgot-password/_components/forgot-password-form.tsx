"use client";

import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { requestPasswordReset } from "@/lib/auth-client";

const forgotSchema = z.object({
  email: z.email(),
});

function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });
  const onSubmit = async (formData: z.infer<typeof forgotSchema>) => {
    const { data, error } = await requestPasswordReset({
      email: formData.email,
      redirectTo: "/reset-password",
    });
    if (error) {
      toast(`Неверный Email`);
    }
    if (data) {
      toast("Письмо отправлено, проверьте почту");
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

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          Восстановить пароль
        </Button>
      </FieldGroup>
    </form>
  );
}

export default ForgotForm;
