import Sidebar from "@/widgets/Sidebar";
import Header from "@/widgets/Header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen gap-4 bg-background p-4 text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 gap-4">
        <Header />
        <main className="flex-1 rounded-4xl bg-card p-6">{children}</main>
      </div>
    </div>
  );
}
