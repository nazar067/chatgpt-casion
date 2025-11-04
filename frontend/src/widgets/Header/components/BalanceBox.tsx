"use client";
import { Montserrat } from "next/font/google";
import * as React from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export function BalanceBox({
  amount,
  currency,
  onDeposit,
}: {
  amount: number;
  currency: string;
  onDeposit: () => void;
}) {
  const [whole, frac] = React.useMemo(() => {
    const s = amount.toFixed(2);
    const [w, f] = s.split(".");
    return [w.replace(/\B(?=(\d{3})+(?!\d))/g, ","), f];
  }, [amount]);

  return (
    <div
      className={`${montserrat.className} flex items-center gap-2 rounded-[12px] bg-[#1E253C] h-[48px] min-w-[193px] px-2`}
      role="group"
    >
      <div className="flex-1 select-none">
        <span className="ml-2 text-white font-extrabold text-[14px] leading-none align-middle">
          {currency}
          {whole}
        </span>
        <span className="text-white/60 font-extrabold text-[14px] leading-none align-middle">
          .{frac}
        </span>
      </div>
      <button
        onClick={onDeposit}
        className="ml-3 h-[36px] min-w-[50px] px-3 rounded-[8px] bg-[#FFB800] text-[#2B1B00] text-sm font-bold hover:brightness-95 active:translate-y-[1px] cursor-pointer"
      >
        Deposit
      </button>
    </div>
  );
}
