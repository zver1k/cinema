"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/shared/ui/select";
import { useState } from "react";
import { searchData } from "@/shared/constants/search";
import { FilmType } from "@/shared/types/api.types";

function SearchSelect() {
  const [value, setValue] = useState<FilmType | "ALL">("ALL");
  return (
    <Select
      value={value}
      onValueChange={(val) => setValue(val as FilmType | "ALL")}
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
