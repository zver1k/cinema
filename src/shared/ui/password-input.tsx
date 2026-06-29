"use client";

import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

function PasswordInput(props: ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        className={cn("pr-10", props.className)}
        type={showPassword ? "text" : "password"}
      />
      <button
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
        type="button"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

export default PasswordInput;
