"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { DialogRoot } from "@/shared/ui/dialog";
import { useDepositFailed } from "../../store/useDepositFailed";
import { Montserrat } from "next/font/google";
import { cn } from "@/shared/lib/cn";
import { useDepositPending } from "../../store/useDepositPending";
import { useDepositModal } from "../../store/useDepositModal";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export default function DepositFailedModal() {
  const { openDeposit } = useDepositModal();
  const { isOpen, close } = useDepositFailed();

  const handleBack = () => {
    close();
    requestAnimationFrame(() => {
      openDeposit({ method: "crypto" });
    });
  };

  return (
    <DialogRoot open={isOpen} onClose={close}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-[#141A2E] text-white shadow-2xl ring-1 ring-white/10",
          "w-[383px] h-[375px] p-5"
        )}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute right-3 top-3 z-20 rounded-lg p-2 text-gray-300 hover:bg-white/10 cursor-pointer bg-[#1E253C] border border-[#252D47]"
          aria-label="Close"
        >
          <X size={18} color="#B2BBD9" />
        </button>

        {/* Icon */}
        <div className="mx-auto mt-6 mb-4 h-[150px] w-[150px] relative">
          <Image
            src="/deposit-popup/failed.png"
            alt="Success"
            fill
            className="object-contain"
          />
        </div>

        <div
          className={`${montserrat.className} text-center font-[800] text-[22px]`}
        >
          Deposit Failed
        </div>
        <p
          className={`${montserrat.className} mt-2 text-center text-[14px] text-[#7781A4] font-[600]`}
        >
          Please check your details and try again
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={handleBack}
            className={`${montserrat.className} h-12 w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-base font-[700] text-white/90 hover:bg-[#232941] cursor-pointer border border-white/10 active:translate-y-[1px]`}
          >
            Try Again
          </button>
          <button
            onClick={close}
            className={`${montserrat.className} h-12 w-full rounded-xl bg-[#1E253C] text-base font-[700] text-white/90 hover:bg-[#232941] cursor-pointer border border-white/10 active:translate-y-[1px]`}
          >
            Continue
          </button>
        </div>
      </div>
    </DialogRoot>
  );
}
