import { FilmDetail } from "@/shared/types/api.types";
import PosterImage from "@/shared/ui/poster-image";

function Poster({ movie }: { movie: FilmDetail }) {
  return (
    <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl">
      <PosterImage
        src={movie.posterUrl}
        alt={movie.nameRu ?? movie.nameEn ?? "Логотип"}
        sizes="(max-width: 1023px) 100vw, (max-width: 1535px) 30vw, 380px"
      />
    </div>
  );
}

export default Poster;
