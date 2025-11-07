"use client";

import * as React from "react";
import Image from "next/image";
import { getCryptoPerUsd } from "@/shared/api/cryptoRates";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

const CRYPTO_ICONS: Record<"BTC" | "ETH" | "USDT", string> = {
  BTC: "/icons/crypto/btc.png",
  ETH: "/icons/crypto/eth.png",
  USDT: "/icons/crypto/usdt.png",
};

function formatCrypto(v: number) {
  return v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
}

export default function WithdrawSummary({
  currency,
  amountUsd,
  feePct = 1,   
}: {
  currency: "BTC" | "ETH" | "USDT";
  amountUsd: string;
  feePct?: number;
}) {
  const [rate, setRate] = React.useState<number | null>(null);
  const usd = Number(amountUsd || 0);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await getCryptoPerUsd(currency);
        if (alive) setRate(r);
      } catch {
        if (alive) setRate(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [currency]);

  const cryptoIcon = CRYPTO_ICONS[currency];

  const withdrawal = rate ? usd * rate : 0;
  const commission = withdrawal * (feePct / 100);
  const receive = withdrawal - commission;

  return (
    <div
      className="w-[402px] h-[96px] rounded-2xl bg-[#1E253C] px-4 py-3"
      role="region"
      aria-label="Withdraw summary"
    >
      <Row
        label="Withdrawal amount"
        icon={cryptoIcon}
        value={rate === null ? "…" : formatCrypto(withdrawal)}
      />
      <Row
        label="Commission"
        icon={cryptoIcon}
        value={rate === null ? "…" : formatCrypto(commission)}
      />
      <Row
        label="The amount you will receive"
        icon={cryptoIcon}
        value={rate === null ? "…" : formatCrypto(receive)}
      />
    </div>
  );
}

function Row({
  label,
  icon,
  value,
}: {
  label: string;
  icon: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between leading-6">
      <span className={`${montserrat.className} text-[14px] text-white/60`}>{label}</span>
      <span className="flex items-center gap-2">
        <Image src={icon} alt="" width={18} height={18} />
        <span className={`${montserrat.className} text-[16px] font-semibold text-white/90`}>{value}</span>
      </span>
    </div>
  );
}
