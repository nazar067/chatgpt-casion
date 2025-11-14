"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { LeaderRowEx, TabKey } from "./leaderboard/types";
import { fetchLeaderboard } from "./leaderboard/leaderboardApi";
import BaseTable from "./leaderboard/BaseTable";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "wins",  label: "Biggest wins", icon: "/icons/essentional/crown.png" },
  { key: "lucky", label: "Lucky drops",  icon: "/icons/essentional/cup.png" },
  { key: "bets",  label: "My bets",      icon: "/icons/list/bill.png" },
];

const PAGE_SIZES = [10, 25, 50, 100];

export default function Leaderboard() {
  const [active, setActive] = useState<TabKey>("wins");
  const [pageSize, setPageSize] = useState<number>(10);
  const [openShow, setOpenShow] = useState(false);

  const [rows, setRows] = useState<LeaderRowEx[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null); 

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetchLeaderboard(active, pageSize, controller.signal)
      .then(setRows)
      .catch((e) => {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Failed to load");
          setRows([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [active, pageSize]);

  return (
    <div className="w-full max-w-[1272px] mx-auto">
      <div className="rounded-xl bg-[#0F1426A6] ring-1 ring-white/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-6">
          <div className="flex items-center gap-3">
            {TABS.map((t) => {
              const isActive = active === t.key;
              return (
                <div key={t.key} className="relative pb-2">
                  <button
                    onClick={() => setActive(t.key)}
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-1.5 rounded-xl transition cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <img src={t.icon} alt="" className={cn("h-4 w-4 object-contain drop-shadow", isActive ? "icon-active-tab" : "icon-non-active-tab")} />
                    <span className={cn(montserrat.className, "text-[14px]", isActive ? "text-white" : "icon-non-active-tab")}>{t.label}</span>
                  </button>

                  <span
                    className={cn(
                      "pointer-events-none absolute left-1 right-1 bottom-0 h-[2px] rounded-full transition-opacity",
                      isActive ? "bg-[#31CFFF] opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex-1" />

          <div className="relative">
            <button
              onClick={() => setOpenShow((s) => !s)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#1E253C] hover:bg-white/10 text-white/90 ring-1 ring-white/10 cursor-pointer active:translate-y-[1px]"
            >
              <span className={`${montserrat.className}`}>Show {pageSize}</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="opacity-80">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </button>

            {openShow && (
              <div
                className="absolute right-0 mt-2 w-32 rounded-xl bg-[#0E1323] ring-1 ring-white/10 shadow-lg overflow-hidden z-10"
                onMouseLeave={() => setOpenShow(false)}
              >
                {PAGE_SIZES.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setPageSize(n);
                      setOpenShow(false);
                    }}
                    className={cn(montserrat.className,
                      "w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 cursor-pointer",
                      n === pageSize && "bg-white/10"
                    )}
                  >
                    Show {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <BaseTable rows={rows} pageSize={pageSize} loading={loading} error={error} />
      </div>
    </div>
  );
}
