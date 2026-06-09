import Sidebar from "@/widgets/Sidebar";
import Header from "@/widgets/Header";
import { ReactNode } from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col gap-3 bg-background p-2 pb-24 text-foreground sm:p-4 sm:pb-24 lg:flex-row lg:gap-4 lg:pb-4">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-4">
          <Header />
          <main className="flex-1 bg-card p-2 sm:p-3 lg:rounded-4xl lg:p-4">
            {children}
          </main>
        </div>
      </div>
      {modal}
    </>
  );
}
