"use client";

import { useState } from "react";
import Image from "next/image";
import { AuthDialog } from "@/features/auth/ui/AuthDialog";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal"],
});


export default function WelcomeBanner({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[1272px] mx-auto">
      <div className="relative h-[380px] w-full rounded-2xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1272px) 100vw, 1272px"
          className="object-cover"
        />

        <div className="absolute inset-0">
          <div className="flex h-full items-center">
            <div className="px-6 sm:px-10 lg:px-12 max-w-[720px] translate-y-[-30px]">
              <h1 className={`${montserrat.className} font-[900] text-white font-black leading-[1.05] tracking-tight
                             text-1xl sm:text-5xl lg:text-1xl`} style={{ fontSize: "clamp(12px, 2.3vw, 50px)", lineHeight: "1.1"}}>
                Welcome Offer
                <br />
                120% up to $5,000
                <br />
                and 75 Free Spins
              </h1>

              <div className="mt-6 translate-y-[60px] flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setOpen(true)}
                  className={`${montserrat.className} font-[700] h-12 px-5 rounded-[10px] cursor-pointer
                             text-[#1A1F35] font-semibold
                             bg-[#FFBE1A] hover:bg-[#FFC73A] active:bg-[#E7AD14]
                             shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]
                             ring-1 ring-black/10`}
                >
                  Register
                </button>

                <span className={`${montserrat.className} font-[700] text-white/80 font-semibold`}>OR</span>

                <div className="grid grid-flow-col auto-cols-[44px] gap-2">
                  <button className="h-11 w-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center cursor-pointer">
                    <Image
                      src="/icons/other/google.png"
                      alt="Google"
                      width={20}
                      height={20}
                      className="object-contain icon-header"
                    />
                  </button>

                  <button className="h-11 w-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center cursor-pointer">
                    <Image
                      src="/icons/other/metamask.png"
                      alt="Metamask"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <button className="h-11 w-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center cursor-pointer">
                    <Image
                      src="/icons/other/steam.png"
                      alt="Steam"
                      width={20}
                      height={20}
                      className="object-contain icon-header"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthDialog initialTab="register" open={open} onOpenChange={setOpen} hideTrigger />
      </div>
    </div>
  );
}
