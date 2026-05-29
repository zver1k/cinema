import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getFilmByIdSafe } from "@/shared/api/films";

export async function isFavorite(movieId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return false;
  const userId = session.user.id;
  const existing = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  return !!existing;
}

export async function getFavoriteMovies() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];
  const userId = session.user.id;
  const listFavoriteMovies = await prisma.favorite.findMany({
    where: { userId },
  });
  const list = await Promise.all(
    listFavoriteMovies.map((fav) => getFilmByIdSafe(fav.movieId)),
  );
  return list.filter((i) => i !== null);
}

export async function getFavoritesCount() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return 0;
  const userId = session.user.id;
  return prisma.favorite.count({ where: { userId } });
}
