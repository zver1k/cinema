import { Clapperboard } from "lucide-react";

function SidebarHeader() {
  return (
    <div className="mb-12 flex items-center gap-3 text-2xl">
      <Clapperboard className="size-7 text-primary" />
      <div>
        <span className="font-bold">Cinema</span>
        <span className="font-extralight">Vision</span>
      </div>
    </div>
  );
}

export default SidebarHeader;
