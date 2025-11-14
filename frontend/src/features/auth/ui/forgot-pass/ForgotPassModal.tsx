"use client";

import Image from "next/image";
import { DialogRoot } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useForgotPassModal } from "./store/useForgotPassModal";
import { useAuthModal } from "../../model/store";
import { ChevronLeft } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useCheckInboxModal } from "./store/useCheckInboxModal";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export function ForgotPassModal() {
  const { isOpen, email, close, setEmail } = useForgotPassModal();
  const { openWith } = useAuthModal();
  const { open: openCheckInbox } = useCheckInboxModal();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
    requestAnimationFrame(() => openCheckInbox());
  };

  const onBack = () => {
    close();
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
            <ChevronLeft className="h-3 w-3"/> Back
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
          <div className="mb-5 grid place-items-center">
            <Image
              src="/forgot-pass-popup/key.png"
              alt="Reset password"
              width={180}
              height={180}
              className="object-contain"
              priority={false}
            />
          </div>

          <h3 className={`${montserrat.className} font-[800] mb-2 text-[20px] font-black`}>Forgot password?</h3>
          <p className={`${montserrat.className} font-[600] mb-4 text-sm text-[#7781A4]`}>
            No worries — it happens even to high-rollers. Enter your email and
            we’ll send you a reset link.
          </p>

          <form onSubmit={onSubmit} className="grid gap-3">
            <label className="grid gap-1.5 text-sm">
              <span className={`${montserrat.className} font-[600] text-[#B2BBD9]`}>E-mail</span>
              <input
                type="email"
                required
                placeholder="Enter e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${montserrat.className} font-[600] h-11 w-full rounded-[8px] bg-[#141A2E] px-3 text-sm text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-sky-500`}
                autoComplete="email"
              />
            </label>

            <Button
              type="submit"
              variant="auth"
              onClick={onSubmit}
              className={`${montserrat.className} font-[700] h-11 cursor-pointer`}
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </DialogRoot>
  );
}
