"use client";

import Image from "next/image";
import { DialogRoot } from "@/shared/ui/dialog";
import { useAuthModal } from "../../model/store";
import { useCheckInboxModal } from "./store/useCheckInboxModal";
import { ChevronLeft } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export function CheckInboxModal() {
  const { isOpen, close } = useCheckInboxModal();
  const { openWith } = useAuthModal();

  const onBack = () => {
    close();
    requestAnimationFrame(() => openWith("login"));
  };

  const onGotIt = () => {
    close();
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
          <div className="mb-5 grid place-items-center">
            <Image
              src="/forgot-pass-popup/success.png"
              alt="E-mail sent"
              width={180}
              height={180}
              className="object-contain"
              priority={false}
            />
          </div>

          <h3 className={`${montserrat.className} font-[800] mb-2 text-[22px] leading-tight`}>
            Check your inbox!
          </h3>
          <p className={`${montserrat.className} font-[600] mb-5 text-sm text-[#7781A4]`}>
            We’ve sent you a password reset link. Follow it to get back in the game.
            Don’t see it? Check your spam folder.
          </p>

          <button
            type="button"
            onClick={onGotIt}
            className={`${montserrat.className} font-[700] h-12 w-full rounded-[12px] bg-[#1E253C] text-white ring-1 ring-white/10 hover:bg-white/5 transition cursor-pointer active:translate-y-[1px]`}
          >
            Got it
          </button>
        </div>
      </div>
    </DialogRoot>
  );
}
