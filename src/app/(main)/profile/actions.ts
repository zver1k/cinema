"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  await auth.api.updateUser({
    body: { name },
    headers: await headers(),
  });
  revalidatePath("/profile");
}
