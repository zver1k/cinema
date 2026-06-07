import { Skeleton } from "@/shared/ui/skeleton";

function Loading() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {[...Array(20)].map((_, i) => (
        <Skeleton key={i} className="aspect-2/3 w-full" />
      ))}
    </div>
  );
}

export default Loading;
