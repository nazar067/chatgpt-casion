"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Montserrat } from "next/font/google";
import { useDepositPending } from "../../store/useDepositPending";
import { startCryptoDeposit } from "@/shared/api/wallet";

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

export default function DepositCrypto() {
  const [addr] = React.useState("ThxKL389mdKH789nR69li8dje88z");
  const [currency, setCurrency] = React.useState<CryptoKey>("BTC");
  const [network, setNetwork] = React.useState<NetworkKey>("BITCOIN");

  const currentCrypto = CRYPTO_ITEMS[currency];
  const openPending = useDepositPending((s) => s.open);

  async function handleMadeDeposit() {
    // тут можно пробрасывать userId из контекста auth
    const { txId } = await startCryptoDeposit({
      userId: "demo-user",           // TODO: заменить на реальный id
      currency,
      network,
      address: addr,
      // amount: ... // если появится ввод суммы в crypto
    });
    openPending(txId);
  }

  return (
    <div className="space-y-4 text-white">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Deposit currency">
          <CurrencySelect value={currency} onChange={setCurrency} />
        </Field>

        <Field label="Select network">
          <NetworkSelect value={network} onChange={setNetwork} />
        </Field>
      </div>

      {/* QR */}
      <div className="relative mx-auto mt-2 w-[168px] rounded-xl overflow-hidden bg-white/10 p-3">
        <Image
          src="/deposit-popup/qr-bg.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
        />
        <Image
          src="/deposit-popup/qr-code.png"
          alt="QR"
          width={180}
          height={180}
          className="relative z-10 mx-auto"
        />
      </div>

      <Field label="Deposit address">
        <div className="flex h-12 items-stretch gap-2 bg-[#141A2E] border border-[#252D47] rounded-[8px]">
          <input
            readOnly
            value={addr}
            className={`${montserrat.className} h-12 w-full rounded-lg px-3 text-white outline-none text-[14px]`}
          />
          <CopyButton text={addr} />
        </div>
      </Field>

      <div className="rounded-lg bg-[#FFBB001A]/90 p-3 text-[13px] text-white/80">
        <div className="flex items-start gap-2">
          <Image src="/icons/essentional/danger-square.png" alt="" width={20} height={20} className="icon-promo"/>
          <span className={`${montserrat.className} text-[#EAF0F9]`}>
            Do not deposit any currency other than{" "}
            <span className={`${montserrat.className} text-[#EAF0F9] font-medium`}>{currentCrypto.label}</span>{" "}
            <span className={`${montserrat.className} text-[#FFBB00] font-medium`}>{currentCrypto.sub}</span>
          </span>
        </div>
      </div>

      <button 
        onClick={handleMadeDeposit}
        className={`${montserratButton.className} h-12 w-full rounded-xl bg-[#FFC300] text-base font-bold text-black hover:opacity-90 cursor-pointer active:translate-y-[1px]`}
      >
        I made a deposit
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

type CryptoKey = "BTC" | "ETH" | "USDT";

const CRYPTO_ITEMS: Record<CryptoKey, { label: string; sub?: string; icon: string }> = {
  BTC:  { label: "Bitcoin",  sub: "BTC",  icon: "/icons/crypto/btc.png" },
  ETH:  { label: "Ethereum", sub: "ETH",  icon: "/icons/crypto/eth.png" },
  USDT: { label: "Tether",   sub: "USDT", icon: "/icons/crypto/usdt.png" },
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
        <span className={`${montserrat.className} font-semibold text-[13px] text-white`}>
          {current.label}{" "}
          {current.sub && <span className={`text-white/60`}>{current.sub}</span>}
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
                  active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"
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
  ERC20:   { label: "Ethereum (ERC-20)", icon: "/icons/text/link-round-angle.png" },
  TRC20:   { label: "TRON (TRC-20)", icon: "/icons/text/link-round-angle.png" },
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
        <Image src={current.icon} alt={current.label} width={18} height={18} className="icon-chat"/>
        <span className={`${montserrat.className} font-semibold text-[13px] text-white`}>{current.label}</span>
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
                  active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"
                )}
              >
                <Image src={it.icon} alt={it.label} width={18} height={18} className="icon-chat" />
                <span className={`${montserrat.className} font-medium`}>{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="mt-[5px] mr-1 h-9 w-9 shrink-0 rounded-lg bg-gradient-to-b from-[#38BDF8] to-[#0EA5E9] hover:opacity-90 cursor-pointer"
        aria-label="Copy address"
        title="Copy"
      >
        <Image
          src="/icons/essentional/copy.png"
          alt="Copy"
          width={15}
          height={15}
          className="mx-auto"
        />
      </button>

      {copied && (
        <div className="absolute right-0 -top-7 rounded-md bg-[#1E253C] px-2 py-1 text-xs text-white shadow-lg border border-white/10 animate-fade-in-out">
          Copied
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-4px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 1.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
