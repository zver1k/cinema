import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { avatarName } from "@/shared/lib/avatar-fallback";

function ProfileHeader({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Avatar className="size-18 text-xl sm:size-22" size="lg">
          <AvatarImage src={image || undefined} alt={name} />
          <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground sm:text-2xl">
            {avatarName(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="truncate text-3xl font-bold tracking-tight sm:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
