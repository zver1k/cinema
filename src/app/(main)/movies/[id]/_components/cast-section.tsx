import { getCastById } from "@/shared/api/cast";
import Image from "next/image";

async function CastSection({ id }: { id: string }) {
  const cast = await getCastById(id);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
      {cast
        .filter((c) => c.professionKey === "ACTOR")
        .slice(0, 6)
        .map((c) => (
          <div
            key={c.staffId}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="size-20 overflow-hidden rounded-full border">
              <Image
                src={c.posterUrl}
                alt={c.nameRu ?? String(c.staffId)}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-[13px] font-bold">{c.nameRu}</div>
            <div className="text-[12px] font-light">{c.description}</div>
          </div>
        ))}
    </div>
  );
}

export default CastSection;
