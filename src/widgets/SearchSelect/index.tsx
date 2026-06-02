"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/shared/ui/select";
import { searchData } from "@/shared/constants/search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchSelect() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      value={type || "ALL"}
      onValueChange={(val) => {
        const params = new URLSearchParams(searchParams.toString());
        if (val === "ALL") params.delete("type");
        else params.set("type", val);
        params.delete("page");
        const target =
          pathname === "/movies"
            ? `?${params.toString()}`
            : `/movies?${params.toString()}`;
        router.push(target);
      }}
    >
      <SelectTrigger className="w-40 rounded-full bg-card">
        <SelectValue placeholder="Все" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {searchData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SearchSelect;
