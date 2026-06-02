import { Skeleton } from "@/shared/ui/skeleton";

function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {[...Array(20)].map((_, i) => (
        <Skeleton key={i} className="aspect-2/3 w-full" />
      ))}
    </div>
  );
}

export default Loading;
