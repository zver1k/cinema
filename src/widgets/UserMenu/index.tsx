import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

function UserMenu() {
  return (
    <div className="bg-card h-14 flex items-center gap-2 justify-between">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <span className="font-bold">Damir K.</span>
        <span>@DamirMedia</span>
      </div>
    </div>
  );
}

export default UserMenu;
