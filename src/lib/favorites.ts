import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function isFavorite(movieId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return false;
  const userId = session.user.id;
  const existing = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  return !!existing;
}
