"use client";

import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Search() {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!value) {
        if (pathname === "/movies") router.push("/movies");
        return;
      }
      const target =
        pathname === "/movies"
          ? `?keyword=${value}`
          : `/movies?keyword=${value}`;
      router.push(target);
    }, 400);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <Field>
      <ButtonGroup>
        <Input
          className="bg-card"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск..."
        />
        <Button
          onClick={() => router.push(`/movies?keyword=${value}`)}
          variant="outline"
        >
          Поиск
        </Button>
      </ButtonGroup>
    </Field>
  );
}

export default Search;
