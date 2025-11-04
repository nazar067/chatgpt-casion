"use client";
import * as React from "react";
import Image from "next/image";
import { MenuItem } from "./MenuItem";
import { ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export function UserMenu({
  name,
  avatar,
  onOpenProfile,
}: {
  name: string;
  avatar: string;
  onOpenProfile: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-[#1E253C] h-[48px] w-[143px] rounded-[8px] px-2 border border-[#252D47] hover:bg-[#232941] cursor-pointer"
      >
        <span className="relative inline-block h-8 w-8 overflow-hidden rounded-xl">
          <Image src={avatar} alt={name} fill sizes="32px" />
        </span>
        <span className={`${montserrat.className} truncate text-white/90 font-semibold text-[13px]`}>{name}</span>
        <ChevronUp
        className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200 icon-promo",
            open ? "rotate-0" : "rotate-90"
        )}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[230px] rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20">
          <MenuItem active icon="/icons/messages/inbox-line-blue.png" label="My Information" onClick={onOpenProfile} />
          <MenuItem icon="/icons/users/users.png" label="Referral System" onClick={() => {}} />
          <MenuItem icon="/icons/electronic/gamepad-minimalistic.png" label="Game History" onClick={() => {}} />
          <MenuItem icon="/icons/money/wallet.png" label="Transaction" onClick={() => {}} />
          <MenuItem icon="/icons/security/scanner-2.png" label="Security" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}
