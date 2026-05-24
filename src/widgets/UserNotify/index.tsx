"use client";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

function UserNotify() {
  const toastId = useRef<string | number | null>(null);

  const handleClick = () => {
    if (toastId.current) return;
    toastId.current = toast("Нет новых уведомлений", {
      onDismiss: () => {
        toastId.current = null;
      },
      onAutoClose: () => {
        toastId.current = null;
      },
    });
  };
  return (
    <div className="transition hover:text-primary" onClick={handleClick}>
      <Bell />
    </div>
  );
}

export default UserNotify;
