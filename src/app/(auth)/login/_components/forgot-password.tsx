"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const router = useRouter();
  return (
    <Button
      variant="link"
      type="button"
      className="h-auto p-0"
      onClick={() => router.push("/forgot-password")}
    >
      Забыли?
    </Button>
  );
}

export default ForgotPassword;
