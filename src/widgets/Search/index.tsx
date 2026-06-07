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
import { Skeleton } from "@/shared/ui/skeleton";

function Search() {
  "use no memo";

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="relative w-full">
      <Field>
        <ButtonGroup className="w-full">
          <Input
            className="bg-card"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Поиск..."
          />
          <Button
            className="px-3 sm:px-4"
            onClick={() => router.push(buildTarget(value))}
            variant="outline"
          >
            Поиск
          </Button>
        </ButtonGroup>

        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (isLoading || (data?.items && data.items.length > 0)) && (
          <div className="absolute top-full left-0 right-0 z-50 bg-card rounded-b-md shadow-lg flex flex-col">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div className="px-3 py-2" key={i}>
                  <Skeleton className="h-5 w-40" />
                </div>
              ))}
            {data?.items.map((film) => (
              <Link
                key={film.kinopoiskId}
                href={`/movies/${film.kinopoiskId}`}
                className="px-3 py-2 hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {film.nameRu} ({film.year})
              </Link>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

export default Search;
