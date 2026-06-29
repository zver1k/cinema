"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();
  const { refetch } = useSession();
  return async () => {
    await signOut();
    await refetch();
    router.refresh();
    router.replace("/");
  };
};
