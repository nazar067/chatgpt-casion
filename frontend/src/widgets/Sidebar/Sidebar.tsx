"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useSidebar } from "@/shared/context/SidebarContext";
import { mainLinks, casinoGroup, originalsGroup, supportLink } from "./sidebarData";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export default function Sidebar() {
  const { isOpen, isSheetOpen, closeSheet } = useSidebar();
  const pathname = usePathname();

  const base = (
    <aside
      className={cn(
        montserrat.className,
        "fixed left-0 top-16 bottom-0 z-30 bg-[#141A2E] border-r border-white/10 transition-all duration-200",
        isOpen ? "w-[264px]" : "w-[72px]"
      )}
    >
      <div className="h-full overflow-y-auto px-3 py-4">
        {/* Banner */}
        <Link
          href="/refer"
          onClick={closeSheet}
          className={cn(
            "relative mb-3 block w-full overflow-hidden rounded-lg ring-1 ring-white/10 transition hover:opacity-90",
            "bg-gradient-to-r from-[#00BFFF5C] to-[#1EA2D51A]",
            "flex items-center gap-3 p-3 h-[58px]"
          )}
        >
          <div className="relative -ml-4 flex-shrink-0">
            <img
              src="/icons/users/add-user.png"
              alt="Bonus Ticket"
              className="h-13 w-13 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
              style={{
                transform: "translateY(2px)",
              }}
            />
          </div>

          {isOpen && (
            <div className="flex flex-col text-left">
              <span className="text-base font-bold text-white leading-tight">
                Up to 20%
              </span>
              <span className="text-sm text-sky-100 opacity-90">
                Invite a friend and get
              </span>
            </div>
          )}
        </Link>

        <Link
          href="/promotions"
          onClick={closeSheet}
          className={cn(
            "relative block w-full overflow-hidden rounded-lg transition hover:opacity-90",
            "flex items-center gap-3 p-3 h-[48px]",
            "bg-[#FFBB001A] text-white"
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg"
            style={{
              padding: "1.5px",
              background:
                "linear-gradient(to bottom, rgba(255,187,0,0) 0%, #FFBB00 25%, #FFBB00 75%, rgba(255,187,0,0) 100%)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              borderRadius: "8px",
              boxShadow: "0 0 8px 2px rgba(255,187,0,0.6)",
            }}
          />

          <div className={cn("relative flex-shrink-0", isOpen ? "ml-2" : "")}>
            <img
              src="/icons/other/promo.png"
              alt="Promotions Icon"
              className="h-5 w-5 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] icon-promo"
              style={{
                transform: "translateY(2px)",
              }}
            />
          </div>

          {isOpen && (
            <div className="flex flex-col text-left">
              <span className="text-base font-bold text-white leading-tight">
                Promotions
              </span>
            </div>
          )}
        </Link>

        {/* Main */}
        <Section title=" " isOpen={isOpen}>
          {mainLinks.map(i => (
            <Item
              key={i.href}
              {...i}
              active={pathname.startsWith(i.href)}
              isOpen={isOpen}
              onClick={closeSheet}
            />
          ))}
        </Section>

        <CollapsibleSection
          title="Casino"
          icon="/icons/casino/chip.png"
          isOpenSidebar={isOpen}
          defaultOpen
        >
          {casinoGroup.map(i => (
            <Item
              key={i.href}
              {...i}
              active={pathname.startsWith(i.href)}
              isOpen={isOpen}
              onClick={closeSheet}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection
          title="Originals"
          icon="/icons/essentional/crown.png"
          isOpenSidebar={isOpen}
          defaultOpen
        >
          {originalsGroup.map(i => (
            <Item
              key={i.href}
              {...i}
              active={pathname.startsWith(i.href)}
              isOpen={isOpen}
              onClick={closeSheet}
            />
          ))}
        </CollapsibleSection>

        <div className="mt-4">
          <div className="group rounded-lg bg-[#1E253C]">
            <Item
              {...supportLink}
              active={pathname === supportLink.href}
              isOpen={isOpen}
              onClick={closeSheet}
            />
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block">{base}</div>
      {isSheetOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black/50" onClick={closeSheet} />
          <div className="fixed inset-y-0 left-0 z-50 w-[264px] bg-[#0E1323] border-r border-white/10">
            {base}
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, isOpen, children }:{
  title: string; isOpen: boolean; children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-2xl">
      {title.trim().length > 0 && (
        <div className="mb-2 px-3 py-2 text-sm font-semibold text-gray-200/90">
          {isOpen ? <span>{title}</span> : <span className="mx-auto h-1 w-8 rounded bg-white/10 block" />}
        </div>
      )}
      <div className={cn(
        "space-y-1 pt-1 pb-2",
        isOpen ? "px-2" : "px-0"
      )}>
        {children}
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon,
  isOpenSidebar,
  defaultOpen = true,
  children,
}: React.PropsWithChildren<{
  title: string;
  icon?: string;
  isOpenSidebar: boolean;
  defaultOpen?: boolean;
}>) {
  const [open, setOpen] = React.useState(defaultOpen);
  const effectiveOpen = isOpenSidebar ? open : true;

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-white/10">
      {/* Header */}
      <button
        type="button"
        onClick={() => isOpenSidebar && setOpen(v => !v)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-3 text-sm font-semibold text-gray-200/90 transition-colors",
          "bg-[#1E253B] hover:bg-[#1E253B] cursor-pointer",
          open ? "rounded-lg" : "rounded-lg"
        )}  
        aria-expanded={effectiveOpen}
      >
        {icon && <img src={icon} alt="" className={cn("h-5 w-5 object-contain opacity-80 icon-header", isOpenSidebar ? "ml-1.5" : "ml-0")} />}
        {isOpenSidebar && <span>{title}</span>}
        {isOpenSidebar && (
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
              open ? "rotate-0" : "-rotate-90"
            )}
          />
        )}
      </button>

      {/* Content */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out",
          effectiveOpen 
            ? cn(
                "max-h-[1000px] opacity-100 pb-2 pt-1",
                isOpenSidebar ? "px-2" : "px-0"
              )
            : "max-h-0 opacity-0 p-0"
        )}
      >
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}

function Item({
  href,
  label,
  icon,
  active,
  isOpen,
  onClick,
}: {
  href: string;
  label: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  isOpen: boolean;
  onClick?: () => void;
}) {
const isImage = typeof icon === "string";
  const compact = !isOpen;

  const sizeCompact = "h-5 w-5";
  const sizeOpen = "h-5 w-5";

  const isPromo = label === "Promotions";
  const isSupport = label === "Live support" || label === "Support";

  const promoBanner = "/icons/sidebar/promotion.png";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative transition-colors",
        compact
          ? "flex h-11 w-full items-center justify-center"
          : "flex h-11 w-full items-center gap-3 px-3",
        !isPromo &&
          !isSupport &&
          (active
            ? "rounded-xl bg-sky-500/15 text-white ring-1 ring-sky-500/30"
            : "rounded-xl text-gray-300 hover:bg-white/10"),
        isPromo && !compact &&
          cn(
            "rounded-xl text-white bg-[#FFBB001A] overflow-visible"
          ),
        isSupport &&
          "w-full justify-center rounded-lg bg-transparent hover:bg-white/10 px-4 py-0 text-center"
      )}
      aria-label={label}
      title={compact ? label : undefined}
    >
      {isPromo && !compact && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            padding: "1.5px",
            background: "linear-gradient(to bottom, rgba(255,187,0,0) 0%, #FFBB00 25%, #FFBB00 75%, rgba(255,187,0,0) 100%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            borderRadius: "8px",
            boxShadow: "0 0 8px 2px rgba(255,187,0,0.6)",
          }}
        />
      )}

      {isPromo && compact ? (
        <div className="relative h-12 w-full overflow-hidden rounded-lg">
          <Image
            src={promoBanner}
            alt="Promotions banner"
            fill
            className="object-contain"
            sizes="100px"
          />
        </div>
      ) : (
        <>
          <span className={cn("relative shrink-0", compact ? sizeCompact : sizeOpen)}>
            {isImage ? (
              <Image
                src={icon}
                alt={label}
                fill
                sizes="32px"                              
                className={cn(
                  "object-contain icon-colored",
                  isPromo && "icon-promo"
                )}
              />
            ) : (
              (() => {
                const Icon = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                return (
                  <Icon
                    className={cn(
                      "absolute inset-0 h-full w-full opacity-90",
                      isPromo && "text-[#FFBB00]"
                    )}
                  />
                );
              })()
            )}
          </span>

          {!compact && <span className="truncate leading-none">{label}</span>}
        </>
      )}
    </Link>
  );
}
