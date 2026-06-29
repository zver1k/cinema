"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { LogOut } from "lucide-react";
import { useSignOut } from "@/shared/hooks/use-sign-out";

function ProfileLogout() {
  const handleSignOut = useSignOut();
  return (
    <Card className="gap-4 p-3">
      <CardContent className="text-center p-6">
        <Button variant="destructive" onClick={handleSignOut}>
          <LogOut size={16} />
          Выйти из аккаунта
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileLogout;
