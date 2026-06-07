import { getPersonById } from "@/shared/api/cast";
import PosterImage from "@/shared/ui/poster-image";
import Filmography from "@/app/(main)/person/[id]/_components/filmography";
import BackButton from "@/shared/ui/back-button";

async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await getPersonById(id);

  const info = [
    { label: "Дата рождения", value: person.birthday },
    { label: "Дата смерти", value: person.death },
    { label: "Место рождения", value: person.birthplace },
    { label: "Рост", value: person.growth && `${person.growth} см` },
  ];
  const visibleInfo = info.filter((row) => row.value);
  return (
    <div className="flex flex-col">
      <div className="min-w-0">
        <BackButton />
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-12.5">
          <div className="relative mx-auto aspect-2/3 w-full max-w-95 overflow-hidden rounded-xl lg:max-w-none">
            <PosterImage
              alt={person.nameRu || person.nameEn || ""}
              src={person.posterUrl}
              sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[54px]">
              {person.nameRu || person.nameEn || ""}
            </h1>
            <h2 className="text-ring text-[18px]">
              {person.nameEn || ""} · {person.profession}
            </h2>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {visibleInfo.map((row) => {
                return (
                  <li key={row.label}>
                    {row.label}: {row.value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <h3>Фильмография</h3>
      <Filmography films={person.films} />
    </div>
  );
}

export default PersonPage;
