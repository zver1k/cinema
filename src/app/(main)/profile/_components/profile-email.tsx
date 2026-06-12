"use client";

import { z } from "zod";
import { changeEmail } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { FieldError } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/shared/ui/label";

const newEmail = z.object({
  email: z.email("Неверный Email"),
});

function ProfileEmail({ email }: { email: string }) {
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
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: zodResolver(newEmail),
  });
  return (
    <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input
          {...registerEmail("email")}
          id="email"
          type="email"
          defaultValue={email}
        />

        <FieldError>{emailErrors.email?.message}</FieldError>
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
  );
}

export default ProfileEmail;
