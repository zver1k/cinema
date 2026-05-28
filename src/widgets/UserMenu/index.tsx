"use client";

import { signOut, useSession } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Spinner } from "@/shared/ui/spinner";

function UserMenu() {
  const { data: session, isPending, error } = useSession();
  if (isPending) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="bg-card h-14 flex items-center gap-2 justify-between">
      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session?.user.image} alt={session?.user.name} />
            <AvatarFallback>
              {session.user.name.toLocaleUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="font-bold">{session?.user.name}</span>
            <Button size="xs" variant="secondary" onClick={() => signOut()}>
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
