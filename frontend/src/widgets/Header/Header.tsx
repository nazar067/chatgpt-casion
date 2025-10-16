"use client";
import Link from "next/link";
import Image from "next/image"; // ✅ добавляем импорт
import { AuthDialog } from "@/features/auth/ui/AuthDialog";
import { Menu, Bell, MessageSquare, Search } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#0E1323]">
      <div className="flex h-16 w-full items-center justify-between px-0">
        {/* Left */}
        <div className="flex items-center gap-3 pl-3 sm:pl-4">
          <button className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941]">
            <Menu size={20} />
          </button>

          <span className="ml-2 text-xl font-extrabold">
            <Image
              src="/logo.png"
              alt="Gamble.gg"
              width={80}
              height={20}
              priority={false}
              className="h-auto w-[100px]"
            />
          </span>

          <nav className="ml-4 flex gap-2">
            <Link
              href="/casino"
              className={`${montserrat.className} flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 px-4 py-2 font-medium text-white shadow hover:opacity-90`}
            >
              <Image
                src="/icons/casino/chip.png"
                alt="Casino Chip"
                width={15}
                height={15}
                className="object-contain"
              />
              Casino
            </Link>

            <Link
              href="/sport"
              className={`${montserrat.className} flex items-center gap-1 rounded-lg bg-[#1A1F35] px-4 py-2 font-medium text-gray-300 hover:bg-[#232941]`}
            >
              <Image
                src="/icons/casino/sport.png"
                alt="Casino Chip"
                width={15}
                height={15}
                className="object-contain"
              />
              Sport
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 pr-3 sm:pr-4">
          <AuthDialog initialTab="register" />
          <AuthDialog initialTab="login" />

          <button className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941]">
            <Image
              src="/icons/messages/chat-square.png"
              alt="Casino Chip"
              width={15}
              height={15}
              className="object-contain"
            />
          </button>
          <button className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941]">
            <Image
              src="/icons/search/magnifer.png"
              alt="Casino Chip"
              width={15}
              height={15}
              className="object-contain"
            />
          </button>
          <button className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941]">
            <Image
              src="/icons/notifications/bell.png"
              alt="Casino Chip"
              width={15}
              height={15}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
