"use client";
import { Bell } from "lucide-react";
import { Announcement } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

function UserNotify({ announcements }: { announcements: Announcement[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const STORAGE_KEY = "announcements_last_seen";

  useEffect(() => {
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const unread = lastSeen
      ? announcements.filter(
          (a) => new Date(a.createdAt).getTime() > new Date(lastSeen).getTime(),
        ).length
      : announcements.length;
    setUnreadCount(unread);
  }, [announcements]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card transition-all duration-200 hover:scale-105 hover:bg-mist-700 sm:h-14 sm:w-14"
      >
        <Bell className="size-5 transition-colors hover:text-primary" />
      </button>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-xs">
          {unreadCount}
        </span>
      )}
      {isOpen && (
        <>
          <div
            className="
        absolute right-0 top-full z-50 mt-3
        w-80 overflow-hidden rounded-2xl
        border border-white/10
        bg-black/90 backdrop-blur-xl
        shadow-2xl
        animate-in fade-in zoom-in-95
      "
          >
            <div className="border-b border-white/10 px-4 py-3">
              <h3 className="text-sm font-semibold text-white">Уведомления</h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="
              border-b border-white/5
              px-4 py-4
              transition-colors
              hover:bg-white/5
            "
                >
                  <h4 className="mb-1 text-sm font-semibold text-white">
                    {a.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-white/70">
                    {a.message}
                  </p>
                </div>
              ))}

              {announcements.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-white/50">
                  Уведомлений пока нет
                </div>
              )}
            </div>
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default UserNotify;
