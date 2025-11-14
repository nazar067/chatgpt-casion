"use client";
import { Button } from "@/shared/ui/button";
import { useAuthModal } from "@/features/auth/model/store";

export function AuthTriggerRegister({ className }: { className?: string }) {
  const { openWith } = useAuthModal();
  return (
    <Button
      variant="primaryAuth"
      onClick={() => openWith("register")}
      className={className ?? "h-11 w-[102px] cursor-pointer active:translate-y-[1px]"}
    >
      Register
    </Button>
  );
}

export function AuthTriggerLogin({ className }: { className?: string }) {
  const { openWith } = useAuthModal();
  return (
    <Button
      variant="secondaryAuth"
      onClick={() => openWith("login")}
      className={className ?? "h-11 cursor-pointer text-sm active:translate-y-[1px]"}
    >
      Login
    </Button>
  );
}
