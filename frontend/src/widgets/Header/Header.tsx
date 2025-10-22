"use client";
import Link from "next/link";
import Image from "next/image";
import { AuthDialog } from "@/features/auth/ui/AuthDialog";
import { useSidebar } from "@/shared/context/SidebarContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export function Header() {
  const { toggle, openSheet } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#141A2E]">
      <div className="flex h-16 w-full items-center justify-between px-0">
        {/* Left */}
        <div className="flex items-center gap-3 pl-3 sm:pl-4">
          {/* На desktop переключаем ширину; на мобилках открываем drawer */}
          <button
            className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941]"
            onClick={() => {
              if (window.innerWidth < 768) openSheet();
              else toggle();
            }}
            aria-label="Toggle sidebar"
          >
            <Image
              src="/icons/list/list.png"
              alt="Sidebar"
              width={20}
              height={20}
              priority={false}
            />
          </button>

          <span className="ml-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Gamble.gg"
                width={180}
                height={120}
                priority={false}
                className="h-auto w-[100px] translate-y-[6px]"
              />
            </Link>

              <Image
                src="/header/light-blur.png"
                alt="Logo glow effect"
                width={180}
                height={100}
                priority={false}
                className="absolute left-30 top-full z-0 w-[180px] -translate-x-1/2 -translate-y-[52px] pointer-events-none select-none"
              />
          </span>

          <div className="ml-30 flex items-center rounded-[10px] border border-[#252D47] bg-[#1E253C] w-[207px] h-[49px] p-[4px]">
            <nav className="flex w-full gap-2">
              <Link
                href="/casino"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 px-4 py-2.5 font-medium text-sm text-white shadow hover:opacity-90 ${montserrat.className}`}
              >
                <Image
                  src="/icons/casino/chip.png"
                  alt="Casino Chip"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                Casino
              </Link>

              <Link
                href="/sport"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-sm text-gray-300 hover:bg-[#232941] ${montserrat.className}`}
              >
                <Image
                  src="/icons/casino/sport.png"
                  alt="Sport Icon"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                Sport
              </Link>
            </nav>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 pr-3 sm:pr-4">
          <AuthDialog initialTab="register" />
          <AuthDialog initialTab="login" />
          <div className="flex items-center justify-between rounded-xl bg-[#0F1426] w-[136px] h-[48px] px-1">
            <button className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47]">
              <Image
                src="/icons/messages/chat-line.png"
                alt="Messages"
                width={18}
                height={18}
                className="object-contain icon-header"
              />
            </button>

            <button className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47]">
              <Image
                src="/icons/search/magnifer.png"
                alt="Search"
                width={18}
                height={18}
                className="object-contain icon-header"
              />
            </button>

            <button className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47]">
              <Image
                src="/icons/notifications/bell.png"
                alt="Notifications"
                width={18}
                height={18}
                className="object-contain icon-header"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
