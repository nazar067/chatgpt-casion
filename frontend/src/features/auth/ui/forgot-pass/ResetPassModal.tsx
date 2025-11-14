"use client";

import { useState } from "react";
import { DialogRoot } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useResetPassModal } from "./store/useResetPassModal";
import { useAuthModal } from "../../model/store";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export function ResetPassModal() {
  const { isOpen, token, close, clear } = useResetPassModal();
  const { openWith } = useAuthModal();

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onBack = () => {
    close();
    requestAnimationFrame(() => openWith("login"));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (p1.length < 8) return setErr("Password must be at least 8 characters.");
    if (p1 !== p2) return setErr("Passwords do not match.");

    console.log("Reset password submit", { token, newPassword: p1 });

    setErr(null);
    close();
    clear();
    requestAnimationFrame(() => openWith("login"));
  };

  return (
    <DialogRoot open={isOpen} onClose={close}>
      <div className="relative w-[min(92vw,383px)] overflow-hidden rounded-2xl bg-[#141A2E] text-white shadow-2xl ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            type="button"
            onClick={onBack}
            className={`${montserrat.className} font-[700] inline-flex items-center gap-2 rounded-[8px] bg-[#1E253C] px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 hover:bg-white/5 cursor-pointer active:translate-y-[1px]`}
          >
            <ChevronLeft className="h-3 w-3" /> Back
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 cursor-pointer active:translate-y-[1px]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <h3 className={`${montserrat.className} font-[800] mb-2 text-[22px] leading-tight`}>
            Create your new password
          </h3>
          <p className={`${montserrat.className} font-[600] mb-4 text-sm text-[#7781A4]`}>
            Almost there! Set a strong password to secure your winnings.
          </p>

          <form onSubmit={onSubmit} className="grid gap-3">
            <label className="grid gap-1.5 text-sm">
              <span className={`${montserrat.className} font-[600] text-[#B2BBD9]`}>New password</span>
              <input
                type="password"
                placeholder="Enter new password"
                className={`${montserrat.className} font-[600] h-11 w-full rounded-[8px] bg-[#141A2E] px-3 text-sm text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-sky-500`}
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                autoComplete="new-password"
              />
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className={`${montserrat.className} font-[600] text-[#B2BBD9]`}>Confirm new password</span>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`${montserrat.className} font-[600] h-11 w-full rounded-[8px] bg-[#141A2E] px-3 text-sm text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-sky-500`}
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                autoComplete="new-password"
              />
            </label>

            {err && (
              <div className={`${montserrat.className} text-[12px] text-red-400`}>
                {err}
              </div>
            )}

            <Button
              type="submit"
              variant="auth"
              className={`${montserrat.className} font-[700] h-11 cursor-pointer`}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </DialogRoot>
  );
}
