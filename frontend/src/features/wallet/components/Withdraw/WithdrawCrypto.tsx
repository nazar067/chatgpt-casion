"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Montserrat } from "next/font/google";
import WithdrawSummary from "./WithdrawSummary";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

const montserratButton = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export default function WithdrawCrypto() {
  // селекты
  const [amount, setAmount] = React.useState<string>("");
  const [currency, setCurrency] = React.useState<CryptoKey>("BTC");
  const [network, setNetwork] = React.useState<NetworkKey>("BITCOIN");
  const presets = [10, 20, 50, 100];

  return (
    <div className="space-y-3 text-white">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Withdraw currency">
          <CurrencySelect value={currency} onChange={setCurrency} />
        </Field>

        <Field label="Select network">
          <NetworkSelect value={network} onChange={setNetwork} />
        </Field>
      </div>

      <Field label="Withdraw address">
        <div className="flex h-12 items-stretch gap-2 bg-[#141A2E] border border-[#252D47] rounded-[8px]">
          <input
            placeholder="Enter your withdraw address"
            className={`${montserrat.className} h-12 w-full rounded-lg px-3 text-white outline-none text-[14px]`}
          />
        </div>
      </Field>
      <Field label="Amount withdraw">
        <div
          className={`${montserrat.className} text-[14px] flex items-center gap-1 rounded-lg border border-[#252D47] p-2`}
        >
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setAmount(value);
            }}
            placeholder="Amount withdraw"
            className="h-11 w-[180px] rounded-md bg-transparent px-1 text-white placeholder:text-white/40 outline-none appearance-none"
          />

          <style jsx>{`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          `}</style>

          {/* buttons */}
          <div className="flex gap-1 ml-5">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className={cn(
                  "h-9 rounded-md px-2 text-sm cursor-pointer transition-all duration-200",
                  amount === String(p)
                    ? "bg-[#1E253C] text-white"
                    : "bg-[#1E253C] text-white/80 hover:bg-gradient-to-r hover:from-[#007CC4] hover:to-[#31CFFF] hover:text-white"
                )}
              >
                ${p}
              </button>
            ))}
          </div>
        </div>
      </Field>

      <div className="rounded-lg bg-[#FFBB001A]/90 p-2 text-[13px] text-white/80">
        <div className="flex items-start gap-2">
          <Image
            src="/icons/essentional/danger-square.png"
            alt=""
            width={20}
            height={20}
            className="icon-promo mt-1.5"
          />
          <span className={`${montserrat.className} text-[#EAF0F9]`}>
            Make sure you have entered the correct recipient address
          </span>
        </div>
      </div>
      <WithdrawSummary currency={currency} amountUsd={amount} />
      <button
        className={`${montserratButton.className} h-12 w-full rounded-xl bg-[#FFC300] text-base font-bold text-black hover:opacity-90 cursor-pointer`}
      >
        Withdraw
      </button>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div
        className={`${montserrat.className} ml-1 mb-2 text-xs text-white/70`}
      >
        {label}
      </div>
      {children}
    </label>
  );
}

type CryptoKey = "BTC" | "ETH" | "USDT";

const CRYPTO_ITEMS: Record<
  CryptoKey,
  { label: string; sub?: string; icon: string }
> = {
  BTC: { label: "Bitcoin", sub: "BTC", icon: "/icons/crypto/btc.png" },
  ETH: { label: "Ethereum", sub: "ETH", icon: "/icons/crypto/eth.png" },
  USDT: { label: "Tether", sub: "USDT", icon: "/icons/crypto/usdt.png" },
};

function CurrencySelect({
  value,
  onChange,
}: {
  value: CryptoKey;
  onChange: (v: CryptoKey) => void;
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

  const current = CRYPTO_ITEMS[value];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center gap-2 rounded-[8px] border border-[#252D47] px-3 hover:bg-[#232941] cursor-pointer"
      >
        <Image src={current.icon} alt={current.label} width={18} height={18} />
        <span
          className={`${montserrat.className} font-semibold text-[13px] text-white`}
        >
          {current.label}{" "}
          {current.sub && (
            <span className={`text-white/60`}>{current.sub}</span>
          )}
        </span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90" : "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20 z-20 flex flex-col space-y-[4px]">
          {(Object.keys(CRYPTO_ITEMS) as CryptoKey[]).map((key) => {
            const it = CRYPTO_ITEMS[key];
            const active = key === value;
            return (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] cursor-pointer",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/90 hover:bg-white/5"
                )}
              >
                <Image src={it.icon} alt={it.label} width={18} height={18} />
                <span className={`${montserrat.className} font-medium`}>
                  {it.label}{" "}
                  {it.sub && <span className="text-white/60">{it.sub}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type NetworkKey = "BITCOIN" | "ERC20" | "TRC20";

const NETWORK_ITEMS: Record<NetworkKey, { label: string; icon: string }> = {
  BITCOIN: { label: "Bitcoin", icon: "/icons/text/link-round-angle.png" },
  ERC20: {
    label: "Ethereum (ERC-20)",
    icon: "/icons/text/link-round-angle.png",
  },
  TRC20: { label: "TRON (TRC-20)", icon: "/icons/text/link-round-angle.png" },
};

function NetworkSelect({
  value,
  onChange,
}: {
  value: NetworkKey;
  onChange: (v: NetworkKey) => void;
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

  const current = NETWORK_ITEMS[value];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center gap-2 rounded-[8px] border border-[#252D47] px-3 hover:bg-[#232941] cursor-pointer"
      >
        <Image
          src={current.icon}
          alt={current.label}
          width={18}
          height={18}
          className="icon-chat"
        />
        <span
          className={`${montserrat.className} font-semibold text-[13px] text-white`}
        >
          {current.label}
        </span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90" : "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20 z-20 flex flex-col space-y-[4px]">
          {(Object.keys(NETWORK_ITEMS) as NetworkKey[]).map((key) => {
            const it = NETWORK_ITEMS[key];
            const active = key === value;
            return (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] cursor-pointer",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/90 hover:bg-white/5"
                )}
              >
                <Image
                  src={it.icon}
                  alt={it.label}
                  width={18}
                  height={18}
                  className="icon-chat"
                />
                <span className={`${montserrat.className} font-medium`}>
                  {it.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
