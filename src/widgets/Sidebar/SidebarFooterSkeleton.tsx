import { Skeleton } from "@/components/ui/skeleton";

function SidebarFooterSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-md" />

          <div className="grid gap-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarFooterSkeleton;
