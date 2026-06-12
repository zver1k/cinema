import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LockKeyhole } from "lucide-react";
import { SettingsToggle } from "@/app/(main)/profile/_components/settings-toggle";
import ProfileLogout from "@/app/(main)/profile/_components/profile-logout";

function ProfilePrivate() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <LockKeyhole size={18} />
            Приватность
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <SettingsToggle label="Показывать избранное" />
          <SettingsToggle label="Показывать оценки" />
          <SettingsToggle label="Скрыть просмотренные" />
        </CardContent>
      </Card>
      <ProfileLogout />
    </div>
  );
}

export default ProfilePrivate;
