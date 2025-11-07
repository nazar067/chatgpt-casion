"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useDepositModal } from "../store/useDepositModal";
import DepositFiat from "./Deposit/DepositFiat";
import DepositCrypto from "./Deposit/DepositCrypto";
import { Montserrat } from "next/font/google";
import { DialogRoot } from "@/shared/ui/dialog";
import WithdrawFiat from "./Withdraw/WithdrawFiat";
import WithdrawCrypto from "./Withdraw/WithdrawCrypto";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  style: ["normal"],
});

const montserratForButtons = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

const montserratContent = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export default function DepositModal() {
  const { isOpen, close, mode, setMode, method, setMethod } = useDepositModal();

  return (
    <DialogRoot open={isOpen} onClose={close}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-[#141A2E] text-white shadow-2xl ring-1 ring-white/10",
          "w-[450px] h-[715px]"
        )}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute right-3 top-3 z-20 rounded-lg p-2 text-gray-300 hover:bg-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="ml-1 mb-1 flex items-center gap-2 p-5 pb-0">
          <Image
            src="/icons/money/card-send-blue.png"
            alt="Deposit"
            width={20}
            height={20}
            className="object-contain"
          />
          <h3 className={`${montserrat.className} text-lg font-semibold text-white`}>{mode === "withdraw" ? "Withdraw" : "Deposit"}</h3>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#1E253C] p-1 mx-5">
          <button
            onClick={() => setMode("deposit")}
            className={`${montserratForButtons.className} flex-1 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${
              mode === "deposit"
                ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setMode("withdraw")}
            className={`${montserratForButtons.className} flex-1 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${
              mode === "withdraw"
                ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Content */}
        <div className="p-5 pt-4">
          {mode === "deposit" ? (
            <>
              <div className="">
                <div className={`${montserratContent.className} ml-1 mb-2 text-xs text-white/70`}>Deposit method</div>
                <DepositMethodSelect
                  value={method}
                  onChange={setMethod}
                />
              </div>

              {/* form */}
              <div className="mt-5 h-[510px] overflow-auto pr-1">
                {method === "fiat" ? <DepositFiat /> : <DepositCrypto />}
              </div>
            </>
          ) : (
            <>
              <div className="">
                <div className={`${montserratContent.className} ml-1 mb-2 text-xs text-white/70`}>Withdraw method</div>
                <DepositMethodSelect
                  value={method}
                  onChange={setMethod}
                />
              </div>

              {/* form */}
              <div className="mt-5 text-white/60">
                {method === "fiat" ? <WithdrawFiat /> : <WithdrawCrypto />}
              </div>
            </>
          )}
        </div>
      </div>
    </DialogRoot>
  );
}

function DepositMethodSelect({
  value,
  onChange,
}: {
  value: "crypto" | "fiat";
  onChange: (m: "crypto" | "fiat") => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const items: Array<{ key: "crypto" | "fiat"; label: string; icon: string; width: number; height: number  }> = [
    { key: "crypto", label: "Cryptocurrency", icon: "/icons/deposit/cryptos.png", width: 30, height: 30 },
    { key: "fiat", label: "Fiat", icon: "/icons/money/safe-square.png", width: 18, height: 18 },
  ];
  const current = items.find((i) => i.key === value) ?? items[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center gap-2 rounded-[8px] border border-[#252D47] px-3 hover:bg-[#232941] cursor-pointer"
      >
        <span className="flex items-center gap-2 text-white">
          <Image src={current.icon} alt="" width={current.width} height={current.height} className={cn(current.label == "Fiat" ? "icon-fiat-deposit" : "")}/>
          <span className={`${montserratContent.className} font-semibold text-[13px]`}>{current.label}</span>
        </span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90" : "rotate-180"
          )}
        />
      </button>

      {/* Dropdown — как в UserMenu */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20 z-20 space-y-[4px]">
          <MethodMenuItem
            active={value === "crypto"}
            icon="/icons/deposit/cryptos.png"
            label="Cryptocurrency"
            onClick={() => {
              onChange("crypto");
              setOpen(false);
            }}
          />
          <MethodMenuItem
            active={value === "fiat"}
            icon="/icons/money/safe-square.png"
            label="Fiat"
            onClick={() => {
              onChange("fiat");
              setOpen(false);
            }}
            color="icon-fiat-deposit"
          />
        </div>
      )}
    </div>
  );
}

function MethodMenuItem({
  active,
  icon,
  label,
  onClick,
  color,
}: {
  active?: boolean;
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] cursor-pointer",
        active
          ? "bg-white/10 text-white"
          : "text-white/90 hover:bg-white/5"
      )}
    >
      <Image src={icon} alt="" width={18} height={18} className={cn(color, "object-contain")} />
      <span className={`${montserratContent.className} font-medium`}>{label}</span>
    </button>
  );
}
