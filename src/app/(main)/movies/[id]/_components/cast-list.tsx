"use client";

import { useState } from "react";
import { Staff } from "@/shared/types/api.types";
import { Button } from "@/shared/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import CastItem from "@/app/(main)/movies/[id]/_components/cast-item";

function CastList({ actors }: { actors: Staff[] }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const visibleActors = isExpanded ? actors : actors.slice(0, 10);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {visibleActors.map((c) => (
          <CastItem key={c.staffId} member={c} />
        ))}
      </div>
      {actors.length > 10 && (
        <Button
          className="mx-auto self-center mt-4"
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
        >
          {!isExpanded ? (
            <>
              <ChevronDown size={16} className="mr-2" /> Показать еще (
              {actors.length})
            </>
          ) : (
            <>
              <ChevronUp size={16} className="mr-2" /> Свернуть
            </>
          )}
        </Button>
      )}
    </div>
  );
}

export default CastList;
