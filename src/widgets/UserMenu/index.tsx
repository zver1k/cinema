"use client";

import { signOut, useSession } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";

function UserMenu() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();
  if (isPending) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="bg-card h-14 flex items-center gap-2 justify-between">
      {session ? (
        <>
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage
                src={session.user.image ?? undefined}
                alt={session.user.name}
              />
              <AvatarFallback>
                {session.user.name.toLocaleUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col items-center">
            <Link href={"/profile"}>
              <span className="font-bold">{session.user.name}</span>
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
