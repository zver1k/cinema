"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { CircleArrowLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="transition hover:text-primary"
      variant="ghost"
      onClick={() => router.back()}
    >
      <CircleArrowLeft size={16} />
      Назад
    </Button>
  );
}

export default BackButton;
