"use client";

import Image from "next/image";

export default function PromoBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full max-w-[1272px] mx-auto">
      <div className="relative h-[202px] w-full rounded-2xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1272px) 100vw, 1272px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
