"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

function ProfileLogout() {
  const router = useRouter();
  return (
    <Card className="gap-4 p-3">
      <CardContent className="text-center p-6">
        <Button
          variant="destructive"
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        >
          <LogOut size={16} />
          Выйти из аккаунта
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileLogout;
