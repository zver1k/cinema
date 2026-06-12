import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";

type CarouselFactsProps = {
  facts?: string[] | null;
};

export function CarouselFacts({ facts }: CarouselFactsProps) {
  if (!facts?.length) return null;
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-[18px] font-semibold">Интересные факты</h3>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: facts.length > 1,
        }}
      >
        <CarouselContent>
          {facts.map((fact, index) => (
            <CarouselItem key={`${fact}-${index}`} className="basis-full">
              <div className="p-1">
                <Card className="h-full">
                  <CardContent className="flex min-h-32 items-center justify-center p-6 text-center">
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {fact}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {facts.length > 1 && (
          <>
            <CarouselPrevious className="top-6 left-2" />
            <CarouselNext className="top-6 right-2" />
          </>
        )}
      </Carousel>
    </section>
  );
}
