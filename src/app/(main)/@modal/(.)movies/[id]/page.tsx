import MovieModalClient from "@/app/(main)/@modal/(.)movies/[id]/_components/movie-modal-client";
import { getFilmByIdSafe } from "@/shared/api/films";

export default async function MovieModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const film = await getFilmByIdSafe(id);
  return <MovieModalClient film={film} />;
}
