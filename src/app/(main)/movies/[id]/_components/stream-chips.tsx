import { getExternalById } from "@/shared/api/external";
import Image from "next/image";
import Link from "next/link";

async function StreamChips({ id }: { id: string }) {
  const streams = await getExternalById(id);
  if (streams.total === 0) return null;
  return (
    <div className="mb-9">
      <h3 className="mb-3.5 text-[18px] font-semibold">Где смотреть</h3>
      <div className="flex flex-wrap gap-2.5">
        {streams.items.map((s) => {
          return (
            <Link
              href={s.url}
              key={s.platform}
              className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-border bg-(--bg-card) px-4 py-2.5 transition-colors hover:border-accent"
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-[6px]">
                <Image
                  src={s.logoUrl}
                  alt={s.platform}
                  fill
                  sizes="28px"
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-[14px] font-medium">{s.platform}</div>
                <div className="ml-1 text-[12px]">по подписке</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default StreamChips;
