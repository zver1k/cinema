// import { getFilmPremieres } from "@/shared/api/premieres";
import Link from "next/link";
import { mockPremieres } from "@/shared/mocks/premieres";

async function SidebarFooter() {
  const { items } = mockPremieres;
  const date = new Date();
  const month = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
  }).format(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const year = new Date().getFullYear().toString();
  return (
    <div className="mt-4 flex flex-col gap-3">
      <span className="font-bold text-white">
        Новинки {month} {year}
      </span>
      {items.slice(0, 5).map((film) => {
        const formatted = new Intl.DateTimeFormat("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(film.premiereRu));

        return (
          <div
            key={film.kinopoiskId}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={film.posterUrlPreview}
              alt={film.nameRu || film.nameEn || film.premiereRu}
              className="h-16 w-12 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-white transition group-hover:text-primary">
                {film.nameRu}
              </span>
              <span className="text-xs text-zinc-400 transition group-hover:text-primary">
                {formatted}
              </span>
            </div>
          </div>
        );
      })}
      <Link className="text-center" href="/new">
        <span className="text-xs cursor-pointer transition hover:text-primary">
          Полный список
        </span>
      </Link>
    </div>
  );
}

export default SidebarFooter;
