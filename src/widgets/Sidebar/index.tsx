import SidebarFooter from "@/widgets/Sidebar/SidebarFooter";
import SidebarMenu from "@/widgets/Sidebar/SidebarMenu";
import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import { Suspense } from "react";
import SidebarFooterSkeleton from "@/widgets/Sidebar/SidebarFooterSkeleton";

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col justify-between rounded-4xl bg-card p-6">
      <div>
        <SidebarHeader />
        <SidebarMenu />
      </div>
      <Suspense fallback={<SidebarFooterSkeleton />}>
        <SidebarFooter />
      </Suspense>
    </aside>
  );
}

export default Sidebar;
