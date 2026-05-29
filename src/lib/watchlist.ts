import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { WatchStatus } from "@/generated/prisma/enums";

export async function getWatchStatus(
  movieId: string,
): Promise<WatchStatus | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const userId = session.user.id;
  const existing = await prisma.watchlist.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  return existing?.status ?? null;
}
