import { NewMovieSection } from "@/widgets/NewMovieSection";
import { AuroraText } from "@/shared/ui/aurora-text";

export const revalidate = 86400;

export default function NewMoviePage() {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <AuroraText
        colors={["#9ca8ab", "#005f5a", "#0092b8"]}
        className="text-4xl m-2 font-bold"
      >
        Новинки
      </AuroraText>
      <NewMovieSection />
    </div>
  );
}
