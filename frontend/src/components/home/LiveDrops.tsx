"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { initialLiveDrops, LiveDrop, makeMockDrop } from "@/data/live-drops";

type Props = {
  initial?: LiveDrop[];
  maxVisible?: number;
};

export default function LiveDrops({ initial = initialLiveDrops, maxVisible = 12 }: Props) {
  const [items, setItems] = React.useState<LiveDrop[]>(initial);
  const [pending, setPending] = React.useState<LiveDrop | null>(null);

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [shift, setShift] = React.useState(0);
  const [gap] = React.useState(24);

  const measureItemWidth = React.useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return 0;
    const first = el.children[0] as HTMLElement;
    const w = first.offsetWidth;
    return w + gap;
  }, [gap]);

  // new drop arrives
  const pushDrop = React.useCallback((drop: LiveDrop) => {
    setPending(drop);
    const delta = measureItemWidth();
    setShift(-delta); 
  }, [measureItemWidth]);

  // end animation
  const onTransitionEnd = React.useCallback(() => {
    if (!pending) return;
    setItems(prev => {
      const next = [...prev.slice(1), pending];
      return next.slice(-maxVisible);
    });
    setPending(null);
    requestAnimationFrame(() => setShift(0));
  }, [pending, maxVisible]);

  // from backend
  React.useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      pushDrop(makeMockDrop(i++));
    }, 5000);
    return () => clearInterval(t);
  }, [pushDrop]);

  // offset
  const style: React.CSSProperties = {
    transform: `translateX(${shift}px)`,
    transition: shift === 0 ? "none" : "transform 450ms cubic-bezier(.22,.61,.36,1)",
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            ref={trackRef}
            style={style}
            onTransitionEnd={onTransitionEnd}
            className={cn("flex items-center gap-6 py-3 px-4")}
          >
            {items.map((it) => (
              <DropItem key={it.id} data={it} />
            ))}
            {pending && <DropItem key={`pending_${pending.id}`} data={pending} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function DropItem({ data }: { data: LiveDrop }) {
  return (
    <div className="flex min-w-[150px] items-center gap-3 rounded-2xl px-1 py-2">
      <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/10">
        <Image src={data.user.avatar} alt={data.user.name} fill sizes="40px" />
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-white/80">
            {data.user.name}
          </span>
        </div>

        <div className="leading-none">
          <span className="text-[15px] font-extrabold text-white">
            {data.currency}{data.amount.toFixed(2).split(".")[0]}
          </span>
          <span className="text-[15px] font-extrabold text-white/50">
            .{data.amount.toFixed(2).split(".")[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
