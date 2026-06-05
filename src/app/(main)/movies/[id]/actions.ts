"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { WatchStatus } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";

export async function toggleFavorite(movieId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/login");
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

export async function setWatchStatus(movieId: string, status: WatchStatus) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/login");
  const userId = session.user.id;
  const existing = await prisma.watchlist.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  if (existing?.status === status) {
    await prisma.watchlist.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  } else {
    await prisma.watchlist.upsert({
      where: { userId_movieId: { userId, movieId } },
      create: { id: crypto.randomUUID(), userId, movieId, status },
      update: { status },
    });
  }
  revalidatePath(`/movies/${movieId}`);
}
