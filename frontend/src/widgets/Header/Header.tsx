"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Montserrat } from "next/font/google";

import { useSidebar } from "@/shared/context/SidebarContext";
import { useChat } from "@/shared/context/ChatContext";
import { useAuth } from "@/shared/context/AuthContext";
import { BalanceBox } from "./components/BalanceBox";
import { RightUtilities } from "./components/RightUtilities";
import { UserMenu } from "./components/UserMenu";
import { AuthDialog } from "@/features/auth/ui/AuthDialog";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export function Header() {
  const { toggle, openSheet } = useSidebar();
  const { toggleChat } = useChat();
  const { isAuthenticated } = useAuth();

  const user = React.useMemo(
    () => ({
      name: "user8391",
      avatar: "/icons/users/test-user-avatar.png",
      balance: 90433.23,
      currency: "$",
    }),
    []
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#141A2E]">
      <div className="flex h-16 w-full items-center justify-between px-0">
        {/* Left */}
        <div className="flex items-center gap-3 pl-3 sm:pl-4">
          <button
            className="rounded-lg bg-[#1A1F35] p-2 hover:bg-[#232941] cursor-pointer"
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) openSheet();
              else toggle();
            }}
            aria-label="Toggle sidebar"
          >
            <Image src="/icons/list/list.png" alt="Sidebar" width={20} height={20} />
          </button>

          <span className="ml-2 relative">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Gamble.gg"
                width={180}
                height={120}
                className="h-auto w-[100px] translate-y-[35px]"
              />
            </Link>

            <Image
              src="/header/light-blur.png"
              alt="Logo glow effect"
              width={200}
              height={100}
              className=" top-full z-0 -translate-x-[45px] -translate-y-[10px] pointer-events-none select-none"
            />
          </span>

          <div className="flex items-center rounded-[10px] border border-[#252D47] bg-[#1E253C] w-[207px] h-[49px] p-[4px]">
            <nav className="flex w-full gap-2">
              <Link
                href="/casino"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 px-4 py-2.5 font-medium text-sm text-white shadow hover:opacity-90 ${montserrat.className}`}
              >
                <Image src="/icons/casino/chip.png" alt="Casino Chip" width={14} height={14} />
                Casino
              </Link>
              <Link
                href="/sport"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-sm text-gray-300 hover:bg-[#232941] ${montserrat.className}`}
              >
                <Image src="/icons/casino/sport.png" alt="Sport Icon" width={14} height={14} />
                Sport
              </Link>
            </nav>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 pr-3 sm:pr-4">
          {!isAuthenticated ? (
            <>
              <AuthDialog initialTab="register" /> 
              <AuthDialog initialTab="login" />
              <RightUtilities toggleChat={toggleChat} />
            </>
          ) : (
            <>
              <BalanceBox
                amount={user.balance}
                currency={user.currency}
                onDeposit={() => console.log("deposit click")}
              />
              <UserMenu
                name={user.name}
                avatar={user.avatar}
                onOpenProfile={() => console.log("open profile")}
              />
              <RightUtilities toggleChat={toggleChat} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
