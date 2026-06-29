"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

function RegisterButton() {
  const router = useRouter();
  return (
    <div className="mt-5 flex items-center gap-1 text-sm text-muted-foreground">
      <span>Нет аккаунта?</span>
      <Button
        variant="link"
        className="h-auto p-0"
        onClick={() => router.push("/register")}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
}

export default RegisterButton;
