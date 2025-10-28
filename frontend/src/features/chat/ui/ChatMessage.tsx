"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { ChatMessage as T } from "../types";
import { useChatUI } from "./ChatUIContext";

export default function ChatMessage({ m }: { m: T }) {
  const mine = m.side === "outgoing";
  const { allMessages, setReplyTarget } = useChatUI();

  const displayTime =
    m.time ?? new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const parent = m.msgAnswerId ? allMessages.find(x => x.id === m.msgAnswerId) : undefined;
  const parentSnippet = parent ? (parent.text.length > 30 ? parent.text.slice(0, 30) + "…" : parent.text) : "";

  const canReply = !mine;

  return (
    <div className={cn("group relative flex w-full gap-2", mine ? "justify-end" : "justify-start")}>
      {!mine && (
        <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-white/10" />
      )}

      <div className="flex max-w-[85%] flex-col relative">
        {/* name row */}
        {!mine && (
          <div className="mb-0.5 flex items-center gap-1.5 text-[11px] text-gray-400">
            <span>{m.user.name}</span>
            {m.isAdmin && (
              <span
                className="flex items-center justify-center rounded-[4px] text-[10px] font-semibold text-black"
                style={{ width: "56px", height: "20px", backgroundColor: "#FFBB00" }}
              >
                ADMIN
              </span>
            )}
            <span className="ml-auto text-[10px] text-gray-500">{displayTime}</span>
          </div>
        )}

        {/* bubble + reply arrow */}
        <div className="relative inline-block">
          <div
            className={cn(
              "rounded-lg px-3 py-2 text-sm leading-snug whitespace-pre-wrap break-words text-gray-100",
              mine
                ? "bg-[#1E253C]"
                : m.isAdmin
                ? "bg-[#FFBB001A]/90"
                : "bg-[#141A2E]"
            )}
          >
            {/* if it answer */}
            {parent && (
              <div className="mb-1.5 flex items-start gap-2 rounded-md bg-white/5 px-2 py-1 text-[12px]">
                <span className="mt-0.5 h-4 w-0.5 shrink-0 rounded bg-sky-400" />
                <div className="flex-1">
                  <div className="text-[11px] text-gray-300">{parent.user.name}</div>
                  <div className="text-gray-200/90">{parentSnippet}</div>
                </div>
              </div>
            )}
            {m.text}
          </div>

          {/* reply button */}
          {canReply && (
            <button
              className={cn(
                "absolute right-[-15px] bottom-1 opacity-0 group-hover:opacity-100 transition-all",
                "text-gray-400 hover:text-white cursor-pointer text-xl"
              )}
              title="Reply"
              onClick={() => setReplyTarget(m)}
            >
              ⤶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
