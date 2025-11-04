"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import type { GameItem } from "@/data/home";
import { Montserrat } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

const PAGE_SIZE = 6;

type Dir = 1 | -1 | 0;

export default function GameCarousel({ items }: { items: GameItem[] }) {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const pageCount = Math.ceil(items.length / PAGE_SIZE);

  const pageItems = useMemo(() => {
    if (showAll) return items;
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page, showAll]);

  const [pendingIdx, setPendingIdx] = useState<number | null>(null);
  const pendingItems = useMemo(() => {
    if (pendingIdx === null || showAll) return [];
    const start = pendingIdx * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [pendingIdx, items, showAll]);

  const [shift, setShift] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [dir, setDir] = useState<Dir>(0);
  const [busy, setBusy] = useState(false);

  const startSlide = useCallback(
    (targetIdx: number, direction: Dir) => {
      if (showAll || busy) return;

      setBusy(true);
      setDir(direction);
      setPendingIdx(targetIdx);

      setWithTransition(false);
      setShift(direction === -1 ? -100 : 0);

      requestAnimationFrame(() => {
        setWithTransition(true);
        setShift(direction === -1 ? 0 : -100);
      });
    },
    [busy, showAll]
  );

  const prev = () => {
    const idx = (page - 1 + pageCount) % pageCount;
    startSlide(idx, -1);
  };
  const next = () => {
    const idx = (page + 1) % pageCount;
    startSlide(idx, 1);
  };

  const onTransitionEnd = () => {
    if (pendingIdx === null) return;

    setPage(pendingIdx);
    setPendingIdx(null);

    setWithTransition(false);
    setShift(0);
    setDir(0);
    setBusy(false);
  };

  return (
    <div className="w-full max-w-[1272px] mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src="/icons/essentional/crown.png"
            alt="Originals icon"
            width={20}
            height={20}
            className="object-contain select-none icon-promo"
          />
          <h2 className={`${montserrat.className} text-white/90 text-lg`}>
            Originals
          </h2>
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: "#00C2FF1A",
              opacity: 0.9,
              width: 22,
              height: 25,
              borderRadius: 6,
            }}
          >
            <span
              className={`${montserrat.className}`}
              style={{
                color: "#31CFFF",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              {items.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!showAll && items.length > PAGE_SIZE && (
            <>
              <button
                onClick={prev}
                disabled={busy}
                className="rounded-lg px-2 py-2 bg-white/5 hover:bg-white/10 text-[#B2BBD9] disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                disabled={busy}
                className="rounded-lg px-2 py-2 bg-white/5 hover:bg-white/10 text-[#B2BBD9] disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <Button
            variant="primaryAuth"
            onClick={() => setShowAll((v) => !v)}
            className={`${montserrat.className} h-9 w-auto px-4 cursor-pointer text-xs`}
          >
            {showAll ? "Hide all" : "View all"}
          </Button>
        </div>
      </div>

      {!showAll ? (
        <div className="relative overflow-hidden px-3 -mx-3 py-3 -my-3">
          <div
            onTransitionEnd={onTransitionEnd}
            style={{
              transform: `translateX(${shift}%)`,
              transition: withTransition
                ? "transform 600ms cubic-bezier(.22,.61,.36,1)"
                : "none",
              width: "100%",
            }}
            className="flex"
          >
            {pendingIdx !== null && dir === -1 && (
              <PageGrid items={pendingItems} />
            )}
            <PageGrid items={pageItems} />
            {pendingIdx !== null && dir === 1 && (
              <PageGrid items={pendingItems} />
            )}
          </div>
        </div>
      ) : (

        <PageGrid items={items} />
      )}
    </div>
  );
}

function PageGrid({ items }: { items: GameItem[] }) {
  return (
    <div className="w-full shrink-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 min-w-0">
        {items.map((g) => (
          <div
            key={g.id}
            className="group rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 min-w-0 transition-transform duration-300 hover:ring-[#31CFFF]/40 hover:scale-[1.04] hover:z-10"
            style={{ transformOrigin: "center center" }}
          >
            <div className="relative w-full pt-[134.34%] cursor-pointer overflow-hidden">
              <Image
                src={g.image}
                alt={g.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.6vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
