"use client";
import React from "react";
import type { ChatMessage } from "@/features/chat/types";

type ChatUIState = {
  replyTarget: ChatMessage | null;
  setReplyTarget: (m: ChatMessage | null) => void;
  allMessages: ChatMessage[];
  setAllMessages: (m: ChatMessage[]) => void;
};

const ChatUIContext = React.createContext<ChatUIState | null>(null);

export function ChatUIProvider({ children }: { children: React.ReactNode }) {
  const [replyTarget, setReplyTarget] = React.useState<ChatMessage | null>(null);
  const [allMessages, setAllMessages] = React.useState<ChatMessage[]>([]);
  const value = React.useMemo(
    () => ({ replyTarget, setReplyTarget, allMessages, setAllMessages }),
    [replyTarget, allMessages]
  );
  return <ChatUIContext.Provider value={value}>{children}</ChatUIContext.Provider>;
}

export function useChatUI() {
  const ctx = React.useContext(ChatUIContext);
  if (!ctx) throw new Error("useChatUI must be used within ChatUIProvider");
  return ctx;
}
