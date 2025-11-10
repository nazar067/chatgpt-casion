"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import { DialogRoot } from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/cn";
import { useDepositPending } from "../../store/useDepositPending";
import { subscribeDepositStatus } from "@/shared/api/wallet";
import { Montserrat } from "next/font/google";
import { useDepositModal } from "../../store/useDepositModal";
import { useDepositSuccess } from "../../store/useDepositSuccess";
import { useDepositFailed } from "../../store/useDepositFailed";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export default function DepositPendingModal() {
  const {
    isOpen,
    close: closePending,
    txId,
    status,
    setStatus,
  } = useDepositPending();

  const closeDeposit = useDepositModal((s) => s.close);
  const { openDeposit } = useDepositModal();
  const openSuccess = useDepositSuccess((s) => s.open);
  const openFailed = useDepositFailed((s) => s.open);
  
  React.useEffect(() => {
    if (isOpen) closeDeposit();
  }, [isOpen, closeDeposit]);

  React.useEffect(() => {
    if (!txId) return;
    const unsub = subscribeDepositStatus(txId, setStatus);
    return unsub;
  }, [txId, setStatus]);

  React.useEffect(() => {
    if (!isOpen) return;
    if (status === "fail") {
      closePending();
      requestAnimationFrame(() => openFailed());
    }
  }, [status, isOpen, closePending, openFailed]);

  const handleBack = () => {
    closePending();
    requestAnimationFrame(() => {
        openDeposit({ method: "crypto" });
    });
  };

  const handleCloseIcon = () => {
    closePending();
  };

  return (
    <DialogRoot open={isOpen} onClose={closePending}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-[#141A2E] text-white shadow-2xl ring-1 ring-white/10",
          "w-[383px] h-[480px] p-5"
        )}
      >
        {/* Close */}
        <button
          onClick={handleCloseIcon}
          className="-mt-2 absolute right-3  z-20 rounded-lg p-2 text-gray-300 hover:bg-white/10 cursor-pointer bg-[#1E253C] border border-[#252D47]"
          aria-label="Close"
        >
          <X size={18} color="#B2BBD9"/>
        </button>

        {/* Back */}
        <button
          onClick={handleBack}
          className="-mt-2 mb-5 inline-flex items-center gap-2 rounded-lg bg-[#1E253C] px-3 py-2 hover:bg-[#232941] cursor-pointer border border-[#252D47] active:translate-y-[1px]"
        >
          <ChevronLeft height={15} width={15}/>
          <span className={`${montserrat.className} font-[700] text-[14px]`}>Back</span>
        </button>

        {/* Clock */}
        <div className="mx-auto mb-4 h-[150px] w-[150px] relative">
          <Image
            src="/deposit-popup/clock.png"
            alt="Clock"
            fill
            className="object-contain"
          />
        </div>

        <div className={`${montserrat.className} font-[800] mb-2 text-[22px] font-bold`}>Replenishment</div>
        <p className={`${montserrat.className} font-[600] mb-3 text-[14px] text-[#7781A4] leading-5`}>
          Payment verification in progress, please wait…Click this button only after your payment is completed
        </p>

        {status === "ok" ? (
          <button
            onClick={() => {
              closePending();
              requestAnimationFrame(() => openSuccess());
            }}
            className={`${montserrat.className} mb-4 h-11.5 w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold cursor-pointer active:translate-y-[1px]`}
          >
            Next
          </button>
        ) : (
          <div className="mb-4 rounded-xl bg-[#FFBB001A] px-3 py-1 text-[13px] text-white/90 flex items-start gap-2">
            <Image src="/icons/essentional/danger-square.png" alt="" width={22} height={22} className="icon-promo mt-[2px]" />
            <span className={`${montserrat.className} font-[600]`}>
              Click this button only after your payment is completed
            </span>
          </div>
        )}
        
        <button
          onClick={closePending}
          className={`${montserrat.className} font-[700] mt-auto h-12 w-full rounded-xl bg-[#1E253C] text-base font-semibold text-white/90 hover:bg-[#232941] cursor-pointer border border-white/10 active:translate-y-[1px]`}
        >
          Cancel
        </button>
      </div>
    </DialogRoot>
  );
}
