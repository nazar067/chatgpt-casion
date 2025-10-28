"use client";
import React from "react";
import { subscribeMessages } from "../api/chatApi";
import { ChatMessage as T } from "../types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { cn } from "@/shared/lib/cn";
import { useChat } from "@/shared/context/ChatContext";
import { Montserrat } from "next/font/google";
import { ChatUIProvider, useChatUI } from "./ChatUIContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export default function ChatSidebar() {
  const { isChatOpen } = useChat();
  if (!isChatOpen) return null;

  const [msgs, setMsgs] = React.useState<T[]>([]);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const unsub = subscribeMessages((m) => {
      setMsgs(m);
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
      });
    });
    return unsub;
  }, []);

  return (
    <aside
      className={cn(
        montserrat.className,
        "fixed right-0 top-16 bottom-0 z-30 border-l border-white/10 shadow-xl",
        "w-[325px]"
      )}
      style={{ background: "#0F1426" }}
      aria-label="Chat"
    >
      <ChatUIProvider>
        <InnerChat msgs={msgs} scrollRef={scrollRef} />
      </ChatUIProvider>
    </aside>
  );
}

function InnerChat({
  msgs,
  scrollRef,
}: {
  msgs: T[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { setAllMessages } = useChatUI();
  const [showScrollDown, setShowScrollDown] = React.useState(false);

  React.useEffect(() => {
    setAllMessages(msgs);
  }, [msgs, setAllMessages]);

  const isAtBottom = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    const threshold = 8;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
  }, [scrollRef]);

  React.useEffect(() => {
    setShowScrollDown(!isAtBottom());
  }, [msgs, isAtBottom]);

  const handleScroll = () => {
    setShowScrollDown(!isAtBottom());
  };

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* header */}
      <div className="flex h-12 flex-none items-center justify-between px-3">
        <div className="ml-1 flex items-center gap-2">
          <img
            src="/icons/messages/chat-line.png"
            alt=""
            className="h-4 w-4 object-contain opacity-90 icon-chat"
          />
          <span className="text-base font-semibold text-white/90">Chat</span>
        </div>

        <div
          className="flex items-center gap-1 rounded-md px-2 py-1.5"
          style={{ background: "#FFBB001A" }}
        >
          <img
            src="/icons/users/users.png"
            alt=""
            className="h-5 w-5 object-contain icon-promo"
          />
          <span className="text-[14px] leading-none text-white/90">233</span>
        </div>
      </div>

      {/* msgs + scroll button overlay */}
      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 h-full overflow-y-auto p-3 pb-3 space-y-4"
        >
          {msgs.map((m) => (
            <ChatMessage key={m.id} m={m} />
          ))}
        </div>

        {/* scroll down button */}
        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            aria-label="Scroll to latest"
            className={cn(
              "absolute right-3 bottom-16 h-10 w-10 rounded-full",
              "flex items-center justify-center",
              "bg-white/10 text-white/90 backdrop-blur-sm",
              "border border-white/15 shadow-lg",
              "opacity-90 hover:opacity-100 hover:bg-white/20",
              "transition cursor-pointer"
            )}
            title="Scroll to latest"
          >
            <img
              src="/icons/arrows/import.png"
              alt="Scroll down"
              className="h-5 w-5 object-contain"
            />
          </button>
        )}
      </div>

      {/* ChatInput */}
      <div
        className="flex-none border-t border-white/10 p-3"
        style={{ background: "#141A2E" }}
      >
        <ChatInput />
      </div>
    </div>
  );
}
