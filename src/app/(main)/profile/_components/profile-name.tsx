"use client";

import { Input } from "@/shared/ui/input";
import { FieldError } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import { FormState, updateProfile } from "@/app/(main)/profile/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/shared/ui/label";

function ProfileName({ name }: { name: string }) {
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  useEffect(() => {
    if (state.success) toast.success("Новый никнейм сохранён");
  }, [state]);
  return (
    <form action={formAction}>
      <div className="grid gap-2">
        <Label>Никнейм</Label>
        <Input id="name" name="name" type="text" defaultValue={name} />
        <FieldError>{state.error}</FieldError>
      </div>
      <Button
        disabled={pending}
        type="submit"
        variant="outline"
        className="w-full mt-2 sm:w-fit"
      >
        <Pencil size={16} />
        Сменить никнейм
      </Button>
    </form>
  );
}

export default ProfileName;
