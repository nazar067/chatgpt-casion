"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import SocialIcon from "./SocialIcon";
import {
  brand, sections, social, paymentIcons, FOOTER_BG, CONTENT_MAX_W,
} from "./config";
import s from "./Footer.module.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

const montserratTabs = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  style: ["normal"],
});

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#0F1426" }} role="contentinfo">
      <div
        className="
          md:ml-[264px] data-[compact=true]:md:ml-[72px]
          md:pl-[20px] data-[compact=true]:md:pl-[212px]
          md:pr-[345px]
        "
      >
        <div className={cn("mx-auto px-4 py-4 md:py-6", CONTENT_MAX_W, s.cq)} style={{ backgroundColor: FOOTER_BG }}>
          <div className={s.wrap}>
            {/* left */}
            <div className="min-w-0">
              <Image
                src="/logo.png"
                alt="Gamble.gg"
                width={180}
                height={40}
                className="h-5 w-auto max-w-full"
                priority
              />

              <p className={cn(montserrat.className, "text-[12px] leading-6 text-slate-300/80", s.desc)}>
                {brand.text}
              </p>

              <div className={s.payments}>
                {paymentIcons.map((p) => (
                  <div key={p.alt} className={s.pay} title={p.alt}>
                    <Image src={p.src} alt={p.alt} width={55} height={55} />
                  </div>
                ))}
              </div>
            </div>

            {/* right sections */}
            <div className={s.sections}>
              {sections.map((sec) => (
                <nav key={sec.title} aria-label={sec.title}>
                  <h4 className={cn(montserratTabs.className, "text-white text-[15px]", s.sectionTitle)}>{sec.title}</h4>
                  <ul className="space-y-2.5">
                    {sec.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className={`${montserrat.className} text-[14px] text-slate-300/90 hover:text-white transition`}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* bottom */}
          <div className={cn("mt-4", s.bottom)}>
            <p className={cn(montserrat.className, "text-sm text-slate-300/80", s.copy, s.small)}>
              Copyright © {new Date().getFullYear()} Gamble.com. All Rights Reserved.
            </p>

            <div className="flex items-center gap-3">
              {social.map((soc) => (
                <SocialIcon key={soc.label} href={soc.href} src={soc.icon} alt={soc.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
