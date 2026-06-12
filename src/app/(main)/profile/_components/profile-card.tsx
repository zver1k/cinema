import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { User } from "lucide-react";
import ProfileName from "@/app/(main)/profile/_components/profile-name";
import ProfilePassword from "@/app/(main)/profile/_components/profile-password";
import ProfileEmail from "@/app/(main)/profile/_components/profile-email";

function ProfileCard({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User size={18} />
            Аккаунт
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <ProfileName name={name} />
          <ProfileEmail email={email} />
        </CardContent>
      </Card>
      <ProfilePassword />
    </div>
  );
}

export default ProfileCard;
