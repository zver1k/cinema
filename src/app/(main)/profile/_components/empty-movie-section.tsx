import { Card } from "@/shared/ui/card";
import { LucideIcon } from "lucide-react";

function EmptyMovieSection({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <Card className="items-center justify-center p-10 text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon size={22} />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-110 text-sm text-muted-foreground">{description}</p>
      </Card>
    </section>
  );
}

export default EmptyMovieSection;
