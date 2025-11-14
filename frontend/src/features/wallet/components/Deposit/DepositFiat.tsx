"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { ChevronUp } from "lucide-react";
import { Montserrat } from "next/font/google";

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

export default function DepositFiat() {
  const [amount, setAmount] = React.useState<string>("");
  const [currency, setCurrency] = React.useState<CurrencyKey>("USD");
  const [fiatMethod, setFiatMethod] = React.useState<CardKey>("mastercard");
  const presets = [10, 20, 50, 100];

  return (
    <div className="space-y-4 text-white">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Deposit currency">
          <CurrencySelect value={currency} onChange={setCurrency} />
        </Field>

        <Field label="Fiat method">
          <CardSelect value={fiatMethod} onChange={setFiatMethod} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Your first name">
          <input
            placeholder="Enter first name"
            className={`${montserrat.className} text-[14px] h-12 w-full rounded-lg px-3 text-white placeholder:text-white/40 outline-none ring-0 border border-[#252D47]`}
          />
        </Field>
        <Field label="Your last name">
          <input
            placeholder="Enter last name"
            className={`${montserrat.className} text-[14px] h-12 w-full rounded-lg border border-[#252D47] px-3 text-white placeholder:text-white/40 outline-none ring-0`}
          />
        </Field>
      </div>

      <Field label="Amount deposit">
        <div className={`${montserrat.className} text-[14px] flex items-center gap-1 rounded-lg border border-[#252D47] p-2`}>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setAmount(value);
            }}
            placeholder="Amount deposit"
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
                  "h-9 rounded-md px-2 text-sm cursor-pointer transition-all duration-200 active:translate-y-[1px]",
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

      <Field label="Your deposit card number">
        <input
          placeholder="Enter your card number"
          className={`${montserrat.className} text-[14px] h-12 w-full rounded-lg border border-[#252D47] px-3 text-white placeholder:text-white/40 outline-none ring-0`}
        />
      </Field>

      {/* Warning */}
      <div className="rounded-lg bg-[#FFBB001A]/90 p-1">
        <div className="flex items-start gap-2">
          <Image src="/icons/essentional/danger-square.png" alt="" width={28} height={28} className="icon-promo ml-1 mt-2" />
          <span className={`${montserrat.className} text-[14px] text-[#EAF0F9]`}>
            Please ensure all fields are filled in correctly before making a deposit
          </span>
        </div>
      </div>

      <button className={`${montserrat.className} h-12 w-full rounded-xl bg-[#FFC300] text-base font-semibold text-black hover:opacity-90 cursor-pointer active:translate-y-[1px]`}>
        Deposit
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
      <div className={`${montserrat.className} ml-1 mb-2 text-xs text-white/70`}>{label}</div>
      {children}
    </label>
  );
}

type CurrencyKey = "USD" | "EUR" | "GBP";

const CURRENCY_ITEMS: Record<
  CurrencyKey,
  { label: string; icon: string }
> = {
  USD: { label: "USD", icon: "/icons/currency/usd.png" },
  EUR: { label: "EUR", icon: "/icons/currency/eur.png" },
  GBP: { label: "GBP", icon: "/icons/currency/gbp.png" },
};

function CurrencySelect({
  value,
  onChange,
}: {
  value: CurrencyKey;
  onChange: (v: CurrencyKey) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const current = CURRENCY_ITEMS[value];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center gap-2 rounded-[8px] border border-[#252D47] px-3 hover:bg-[#232941] cursor-pointer"
      >
        <Image src={current.icon} alt={current.label} width={18} height={18} />
        <span className="font-semibold text-[13px] text-white">{current.label}</span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90" : "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20 z-20 flex flex-col space-y-[4px]">
          {(Object.keys(CURRENCY_ITEMS) as CurrencyKey[]).map((key) => {
            const it = CURRENCY_ITEMS[key];
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
                  active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"
                )}
              >
                <Image src={it.icon} alt={it.label} width={18} height={18} />
                <span className={`${montserrat.className} font-medium`}>{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type CardKey = "visa" | "mastercard";

const CARD_ITEMS: Record<CardKey, { label: string; icon: string }> = {
  visa: { label: "Visa", icon: "/icons/deposit/visa.png" },
  mastercard: { label: "Mastercard", icon: "/icons/deposit/mastercard.png" },
};

function CardSelect({
  value,
  onChange,
}: {
  value: CardKey;
  onChange: (v: CardKey) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const current = CARD_ITEMS[value];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center gap-2 rounded-[8px] border border-[#252D47] px-3 hover:bg-[#232941] cursor-pointer"
      >
        <Image src={current.icon} alt={current.label} width={22} height={22} />
        <span className="font-semibold text-[13px] text-white">{current.label}</span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-90" : "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#1A2036] p-2 shadow-xl ring-1 ring-black/20 z-20 flex flex-col space-y-[4px]">
          {(Object.keys(CARD_ITEMS) as CardKey[]).map((key) => {
            const it = CARD_ITEMS[key];
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
                  active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"
                )}
              >
                <Image src={it.icon} alt={it.label} width={22} height={22} />
                <span className={`${montserratButton.className} font-medium`}>{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
