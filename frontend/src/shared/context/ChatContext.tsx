"use client";
import React from "react";

type ChatState = {
  isChatOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
};

const ChatCtx = React.createContext<ChatState | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = React.useState(true);

  const value = React.useMemo(
    () => ({
      isChatOpen,
      toggleChat: () => setIsChatOpen((v) => !v),
      openChat: () => setIsChatOpen(true),
      closeChat: () => setIsChatOpen(false),
    }),
    [isChatOpen]
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = React.useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
  return ctx;
}
