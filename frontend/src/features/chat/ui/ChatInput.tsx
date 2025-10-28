"use client";
import React from "react";
import { sendMessage } from "../api/chatApi";
import { useAuth } from "@/shared/context/AuthContext";
import { cn } from "@/shared/lib/cn";
import { AuthDialog } from "@/features/auth/ui/AuthDialog";
import { useChatUI } from "./ChatUIContext";

export default function ChatInput() {
  const { isAuthenticated } = useAuth();
  const { replyTarget, setReplyTarget } = useChatUI();
  const [text, setText] = React.useState("");
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  async function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim() || !isAuthenticated) return;
    await sendMessage(text.trim(), "me", "You", {
      replyToId: replyTarget?.id,
    });
    setText("");
    setReplyTarget(null);
  }

  const previewText =
    replyTarget?.text ? (replyTarget.text.length > 30 ? replyTarget.text.slice(0, 30) + "…" : replyTarget.text) : "";

  return (
    <>
      {/* aswer preview */}
      {replyTarget && (
        <div className="mb-2 flex items-start gap-2 rounded-[10px] bg-[#141A2E] px-3 py-2">
          <span className="mt-0.5 h-4 w-0.5 shrink-0 rounded bg-sky-400" />
          <div className="flex-1">
            <div className="text-[11px] text-gray-300">{replyTarget.user.name}</div>
            <div className="text-[12px] text-gray-100/90">{previewText}</div>
          </div>
          <button
            onClick={() => setReplyTarget(null)}
            className="ml-2 rounded p-1 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label="Cancel reply"
          >
            ×
          </button>
        </div>
      )}

      {/* form */}
      <form onSubmit={onSend} className="flex items-center gap-2 rounded-[10px] bg-[#1E253C] px-2 py-2">
        <input
          className={cn(
            "h-9 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white"
          )}
          placeholder={isAuthenticated ? "Type a message…" : "Please log in to chat"}
          disabled={!isAuthenticated}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {isAuthenticated ? (
          <button
            type="submit"
            disabled={!text.trim()}
            className={cn(
              "h-9 shrink-0 rounded-md px-3 text-sm font-medium transition",
              text.trim()
                ? "bg-sky-500 text-white hover:bg-sky-600 cursor-pointer"
                : "bg-white/10 text-gray-400 cursor-not-allowed"
            )}
          >
            Send
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAuthDialog(true)}
            className="h-9 shrink-0 rounded-md px-3 text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition cursor-pointer"
          >
            Login
          </button>
        )}
      </form>

      <AuthDialog initialTab="login" open={showAuthDialog} onOpenChange={setShowAuthDialog} hideTrigger />
    </>
  );
}
