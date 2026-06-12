"use client";

import { signOut, useSession } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";
import { avatarName } from "@/shared/lib/avatar-fallback";

function UserMenu() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();
  if (isPending) return <Spinner />;
  if (error) return <Link href={"/login"}>Авторизация</Link>;

  return (
    <div className="flex h-12 min-w-0 items-center justify-between gap-2 bg-card sm:h-14">
      {session ? (
        <>
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage
                src={session.user.image ?? undefined}
                alt={session.user.name}
              />
              <AvatarFallback>{avatarName(session.user.name)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="hidden min-w-0 flex-col items-center sm:flex">
            <Link href={"/profile"}>
              <span className="block max-w-24 truncate font-bold lg:max-w-32">
                {session.user.name}
              </span>
            </Link>
            <Button
              size="xs"
              variant="secondary"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              Выйти
            </Button>
          </div>
        </>
      ) : (
        <Link href={"/login"}>Авторизация</Link>
      )}
    </div>
  );
}

export default UserMenu;
