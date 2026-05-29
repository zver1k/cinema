"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(movieId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  const userId = session.user.id;
  const existing = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  if (existing) {
    await prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  } else {
    await prisma.favorite.create({
      data: { id: crypto.randomUUID(), userId, movieId },
    });
  }
  revalidatePath(`/movies/${movieId}`);
}
