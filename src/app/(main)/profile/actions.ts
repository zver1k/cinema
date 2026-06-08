"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Имя не должно быть пустым"),
});

export type FormState = { error?: string; success?: boolean };

export async function updateProfile(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const result = schema.safeParse({ name });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  await auth.api.updateUser({
    body: { name: result.data.name },
    headers: await headers(),
  });
  revalidatePath("/profile");
  return { success: true };
}
