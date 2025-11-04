"use client";
import Image from "next/image";

export function RightUtilities({ toggleChat }: { toggleChat: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#0F1426] w-[136px] h-[48px] px-1">
      <button
        onClick={toggleChat}
        className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47] cursor-pointer"
      >
        <Image src="/icons/messages/chat-line.png" alt="Messages" width={18} height={18} className="icon-header" />
      </button>

      <button className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47] cursor-pointer">
        <Image src="/icons/search/magnifer.png" alt="Search" width={18} height={18} className="icon-header" />
      </button>

      <button className="rounded-lg bg-[#1A1F35] hover:bg-[#232941] flex items-center justify-center w-[40px] h-[40px] border border-[#252D47] cursor-pointer">
        <Image src="/icons/notifications/bell.png" alt="Notifications" width={18} height={18} className="icon-header" />
      </button>
    </div>
  );
}
