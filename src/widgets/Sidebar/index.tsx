import SidebarFooter from "@/widgets/Sidebar/SidebarFooter";
import SidebarMenu from "@/widgets/Sidebar/SidebarMenu";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import { Suspense } from "react";
import SidebarFooterSkeleton from "@/widgets/Sidebar/SidebarFooterSkeleton";
import { Separator } from "@/shared/ui/separator";

function Sidebar() {
  return (
    <aside className="flex w-full flex-col gap-4 rounded-3xl bg-card p-3 sm:p-4 lg:w-72 lg:gap-5 lg:rounded-4xl lg:p-6">
      <div className="min-w-0">
        <SidebarHeader />
        <SidebarMenu />
      </div>
      <Separator className="hidden lg:block" />
      <div className="hidden lg:block">
        <Suspense fallback={<SidebarFooterSkeleton />}>
          <SidebarFooter />
        </Suspense>
      </div>
    </aside>
  );
}

export default Sidebar;
