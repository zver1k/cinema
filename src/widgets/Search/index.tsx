"use client";

import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Search() {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";

  const buildTarget = (kw: string) => {
    const params = new URLSearchParams();
    if (kw) params.set("keyword", kw);
    if (type && type !== "ALL") params.set("type", type);
    const query = params.toString();
    return pathname === "/movies" ? `?${query}` : `/movies?${query}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!value) {
        if (pathname === "/movies") router.push("/movies");
        return;
      }
      router.push(buildTarget(value));
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
          onClick={() => router.push(buildTarget(value))}
          variant="outline"
        >
          Поиск
        </Button>
      </ButtonGroup>
    </Field>
  );
}

export default Search;
