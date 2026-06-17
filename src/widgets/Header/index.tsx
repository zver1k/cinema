import { Suspense } from "react";
import SearchSelect from "@/widgets/SearchSelect";
import Search from "@/widgets/Search";
import UserNotify from "@/widgets/UserNotify";
import UserMenu from "@/widgets/UserMenu";
import { getAnnouncements } from "@/lib/announcements";

async function Header() {
  const announcements = await getAnnouncements();
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
      <div className="flex h-12 min-w-0 flex-1 items-center rounded-full bg-card px-3 sm:h-14 sm:flex-none sm:px-4 lg:px-6">
        <Suspense>
          <SearchSelect />
        </Suspense>
      </div>

      <div className="order-last flex h-12 min-w-0 flex-[1_0_100%] items-center rounded-full bg-card px-3 sm:h-14 sm:px-4 md:order-0 md:flex-1 lg:px-6">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <UserNotify announcements={announcements} />

      <div className="flex h-12 min-w-0 items-center rounded-full bg-card px-3 sm:h-14 sm:px-4 lg:px-6">
        <UserMenu />
      </div>
    </div>
  );
}

export default Header;
