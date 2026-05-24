import SidebarFooter from "@/widgets/Sidebar/SidebarFooter";
import SidebarMenu from "@/widgets/Sidebar/SidebarMenu";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import { Suspense } from "react";
import SidebarFooterSkeleton from "@/widgets/Sidebar/SidebarFooterSkeleton";
import { Separator } from "@/shared/ui/separator";

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col rounded-4xl bg-card p-6 gap-5">
      <div>
        <SidebarHeader />
        <SidebarMenu />
      </div>
      <Separator />
      <Suspense fallback={<SidebarFooterSkeleton />}>
        <SidebarFooter />
      </Suspense>
    </aside>
  );
}

export default Sidebar;
