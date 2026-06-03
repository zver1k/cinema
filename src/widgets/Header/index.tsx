import { Suspense } from "react";
import SearchSelect from "@/widgets/SearchSelect";
import Search from "@/widgets/Search";
import UserNotify from "@/widgets/UserNotify";
import UserMenu from "@/widgets/UserMenu";

function Header() {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-card px-6 h-14 flex items-center">
        <Suspense>
          <SearchSelect />
        </Suspense>
      </div>

      <div className="flex-1 rounded-full bg-card px-6 h-14 flex items-center">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <button className="w-14 h-14 rounded-full bg-card flex items-center justify-center hover:bg-mist-700 transition-colors">
        <UserNotify />
      </button>

      <div className="rounded-full bg-card px-6 h-14 flex items-center">
        <UserMenu />
      </div>
    </div>
  );
}

export default Header;
