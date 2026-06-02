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
      <div className="min-w-0 px-9 pt-8 pb-15">
        <BackButton />
        <div className="mx-auto grid max-w-300 grid-cols-[minmax(280px,380px)_1fr] gap-12.5">
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl">
            <PosterImage
              alt={person.nameRu || person.nameEn || ""}
              src={person.posterUrl}
              sizes="(max-width: 639px) calc(100vw), (max-width: 767px) calc((100vw - 10px) / 2), (max-width: 1023px) calc((100vw - 350px) / 4), calc((100vw - 370px) / 6)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[54px] font-bold">
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
