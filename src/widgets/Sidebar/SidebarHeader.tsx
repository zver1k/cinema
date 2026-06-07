import { Clapperboard } from "lucide-react";
import { SparklesText } from "@/shared/ui/sparkles-text";
import Link from "next/link";

function SidebarHeader() {
  return (
    <div className="mb-4 text-xl lg:mb-12 lg:text-2xl">
      <Link className="flex items-center gap-3" href="/">
        <Clapperboard className="size-7 text-primary" />

        <SparklesText
          colors={{ first: "#9ca8ab", second: "#005f5a" }}
          sparklesCount={5}
          className="font-bold text-3xl"
        >
          CinemaVision
        </SparklesText>
      </Link>
    </div>
  );
}

export default SidebarHeader;
