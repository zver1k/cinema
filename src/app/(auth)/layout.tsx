import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) return redirect("/");
  return (
    <>
      {children}
      {modal}
    </>
  );
}
