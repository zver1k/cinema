import { getExternalById } from "@/shared/api/external";
import Image from "next/image";
import Link from "next/link";

async function StreamChips({ id }: { id: string }) {
  const streams = await getExternalById(id);
  console.log(streams.items);
  return (
    <div className="flex flex-wrap gap-2.5">
      {streams.items.map((s) => {
        return (
          <Link
            href={s.url}
            key={s.platform}
            className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-border bg-(--bg-card) px-4 py-2.5 transition-colors hover:border-accent"
          >
            <div className="grid h-7 w-7 place-items-center rounded-[6px] text-[13px] font-bold">
              <Image
                src={s.logoUrl}
                alt={s.platform}
                width={80}
                height={80}
                unoptimized
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
  );
}

export default StreamChips;
