import { Suspense } from "react";
import SearchSelect from "@/widgets/SearchSelect";
import Search from "@/widgets/Search";
import UserNotify from "@/widgets/UserNotify";
import UserMenu from "@/widgets/UserMenu";

function Header() {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
      <div className="flex h-12 min-w-0 flex-1 items-center rounded-full bg-card px-3 sm:h-14 sm:flex-none sm:px-4 lg:px-6">
        <Suspense>
          <SearchSelect />
        </Suspense>
      </div>

      <div className="order-last flex h-12 min-w-0 flex-[1_0_100%] items-center rounded-full bg-card px-3 sm:h-14 sm:px-4 md:order-none md:flex-1 lg:px-6">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card transition-colors hover:bg-mist-700 sm:h-14 sm:w-14">
        <UserNotify />
      </button>

      <div className="flex h-12 min-w-0 items-center rounded-full bg-card px-3 sm:h-14 sm:px-4 lg:px-6">
        <UserMenu />
      </div>
    </div>
  );
}

export default Header;
