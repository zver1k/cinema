import Image from "next/image";
import { Staff } from "@/shared/types/api.types";
import Link from "next/link";

interface CastItemProps {
  member: Staff;
}

function CastItem({ member }: CastItemProps) {
  const name = member.nameRu ?? member.nameEn ?? "Без имени";

  return (
    <Link href={`/person/${member.staffId}`}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="size-20 overflow-hidden rounded-full border">
          <Image
            src={member.posterUrl}
            alt={name}
            width={80}
            height={80}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-[13px] font-bold">{name}</div>
        <div className="text-[12px] font-light">{member.description}</div>
      </div>
    </Link>
  );
}

export default CastItem;
