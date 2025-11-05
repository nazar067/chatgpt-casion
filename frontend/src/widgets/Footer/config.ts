import { FooterSection, SocialLink, PaymentIcon } from "./types";

export const FOOTER_BG = "#141A2E";

export const CONTENT_MAX_W = "max-w-[1350px]";

export const brand = {
  logoSrc: "/brands/gamblegg.svg",
  text: `Gable.gg is recognized as one of the leading crypto casino platforms in the industry. It operates under the trademark of GABLE N.V.
Company address: Kaya Richard J. Beaujon Z/N, Curaçao, CW.`,
};

export const paymentIcons: PaymentIcon[] = [
  { src: "/footer/binance.png", alt: "BINANCE" },
  { src: "/footer/xrp.png", alt: "XRP" },
  { src: "/footer/trx.png", alt: "TRX" },
  { src: "/footer/tether.png", alt: "USDT" },
  { src: "/footer/eth.png", alt: "ETH" },
  { src: "/footer/btc.png", alt: "BTC" },
];

export const sections: FooterSection[] = [
  {
    title: "Features",
    links: [
      { label: "Originals", href: "/originals" },
      { label: "Sport", href: "/sport" },
      { label: "Affiliate program", href: "/affiliate" },
      { label: "Promotions", href: "/promotions" },
      { label: "Casino", href: "/casino" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Promotions", href: "/promotions" },
      { label: "Provably Fair", href: "/provably-fair" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Documents",
    links: [
      { label: "Responsible Gaming", href: "/docs/responsible-gaming" },
      { label: "Modern Slavery Statement", href: "/docs/modern-slavery" },
      { label: "Complaints Policy", href: "/docs/complaints" },
      { label: "GDPR Compliance", href: "/docs/gdpr" },
      { label: "Terms & Conditions", href: "/docs/terms" },
      { label: "Privacy Policy", href: "/docs/privacy" },
    ],
  },
];

export const social: SocialLink[] = [
  { icon: "/footer/x.png", href: "https://x.com/", label: "X" },
  { icon: "/footer/instagram.png", href: "https://instagram.com/", label: "Instagram" },
  { icon: "/footer/telegram.png", href: "https://t.me/", label: "Telegram" },
];

