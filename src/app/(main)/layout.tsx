import Sidebar from "@/widgets/Sidebar";
import Header from "@/widgets/Header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col gap-3 bg-background p-2 pb-24 text-foreground sm:p-4 sm:pb-24 lg:flex-row lg:gap-4 lg:pb-4">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-4">
        <Header />
        <main className="flex-1 rounded-3xl bg-card p-3 sm:p-4 lg:rounded-4xl lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
