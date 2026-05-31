import { Clapperboard } from "lucide-react";
import { SparklesText } from "@/shared/ui/sparkles-text";

function SidebarHeader() {
  return (
    <div className="mb-12 flex items-center gap-3 text-2xl">
      <Clapperboard className="size-7 text-primary" />

      <SparklesText
        colors={{ first: "#9ca8ab", second: "#005f5a" }}
        sparklesCount={5}
        className="font-bold text-3xl"
      >
        CinemaVision
      </SparklesText>
    </div>
  );
}

export default SidebarHeader;
