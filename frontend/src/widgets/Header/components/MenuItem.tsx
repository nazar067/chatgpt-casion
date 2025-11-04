"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export function MenuItem({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left cursor-pointer ${
        active
          ? "bg-gradient-to-b from-[#0E204F4A] to-[#0099FF] text-white shadow-inner ring-1 ring-[#00C2FF]/10"
          : "hover:bg-[#0F1426] text-white/80"
      }`}
    >
      <span className={`relative h-6 w-6 overflow-hidden rounded-[6px] flex items-center justify-center ${label != "My Information" ? "icon-header" : ""}`}>
        <Image src={icon} alt="" width={20} height={20} />
      </span>
      <span className={`${montserrat.className} font-medium text-[14px]`}>{label}</span>
    </button>
  );
}
