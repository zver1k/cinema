"use client";

import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchMovies } from "@/widgets/Search/actions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function Search() {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";

  const [debouncedValue, setDebouncedValue] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => searchMovies({ keyword: debouncedValue }),
    enabled: debouncedValue.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const buildTarget = (kw: string) => {
    const params = new URLSearchParams();
    if (kw) params.set("keyword", kw);
    if (type && type !== "ALL") params.set("type", type);
    const query = params.toString();
    return pathname === "/movies" ? `?${query}` : `/movies?${query}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
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
      {isLoading && <p>Загрузка...</p>}
      {data && <p>Найдено: {data.items.length}</p>}
      {data?.items.map((film) => (
        <Link key={film.kinopoiskId} href={`/movies/${film.kinopoiskId}`}>
          {film.nameRu} ({film.year})
        </Link>
      ))}
    </Field>
  );
}

export default Search;
