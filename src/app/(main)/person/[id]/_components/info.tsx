import dayjs from "dayjs";
import { getAgeWord } from "@/shared/lib/getAgeWord";
import PosterImage from "@/shared/ui/poster-image";
import { CarouselFacts } from "@/app/(main)/person/[id]/_components/facts";
import { PersonDetail } from "@/shared/types/api.types";

function PersonInfo({ person }: { person: PersonDetail }) {
  const info = [
    {
      label: "Дата рождения",
      value: person.birthday && dayjs(person.birthday).format("DD.MM.YYYY"),
    },
    { label: "Место рождения", value: person.birthplace },
    {
      label: "Дата смерти",
      value: person.death && dayjs(person.death).format("DD.MM.YYYY"),
    },
    { label: "Место смерти", value: person.deathplace },
    {
      label: "Возраст",
      value: person.age && (
        <span>
          {person.age} {getAgeWord(person.age)}{" "}
        </span>
      ),
    },
    { label: "Рост", value: person.growth && `${person.growth} см` },
  ];
  const visibleInfo = info.filter((row) => row.value);
  return (
    <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-12.5">
      <div className="relative mx-auto aspect-2/3 w-full max-w-95 overflow-hidden rounded-xl lg:max-w-none">
        <PosterImage
          alt={person.nameRu || person.nameEn || ""}
          src={person.posterUrl}
          sizes="min(100vw, 380px)"
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
        <CarouselFacts facts={person.facts} />
      </div>
    </div>
  );
}

export default PersonInfo;
