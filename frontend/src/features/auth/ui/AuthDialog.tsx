"use client";

import { useState } from "react";
import Image from "next/image";
import { DialogRoot } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { X, ShieldAlert } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserratItalic = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  style: ["normal"],
});
const montserratForButtons = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

export function AuthDialog({
  initialTab = "register",
}: {
  initialTab?: "register" | "login";
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"register" | "login">(initialTab);

  return (
    <>
      {initialTab === "register" ? (
        <Button variant="primaryAuth" onClick={() => setOpen(true)}>
          Register
        </Button>
      ) : (
        <Button variant="secondaryAuth" onClick={() => setOpen(true)}>
          Login
        </Button>
      )}

      <DialogRoot open={open} onClose={() => setOpen(false)}>
        <div className="relative grid w-[min(92vw,700px)] grid-cols-1 overflow-hidden rounded-2xl bg-[#0E1323] text-white shadow-2xl md:grid-cols-[300px_380px]">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-20 rounded-lg p-2 text-gray-300 hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="relative hidden min-h-[540px] md:block">
            <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-transparent">
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: 842, height: 526, transform: "scale(0.43)" }}
              >
                {/* BG */}
                <div
                  className="absolute"
                  style={{
                    width: 1000,
                    height: 1500,
                    left: "calc(50% - 842px/2 - 171.5px)",
                    top: 0,
                  }}
                >
                  <Image
                    src="/promo/background-auth-popup.png"
                    alt="Promo background"
                    fill
                    className="object-cover opacity-80 brightness-150"
                    style={{ mixBlendMode: "color-dodge" }}
                    sizes="(min-width:768px) 300px, 100vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(0,0,0,0) 88.02%, #000 100%)",
                    }}
                  />
                </div>

                {/* Dragon */}
                <div
                  className="absolute select-none"
                  style={
                    tab === "login"
                      ? { width: 500, height: 750, left: 200, top: 540 }
                      : { width: 668, height: 1000, left: 50, top: 520 }
                  }
                >
                  <Image
                    src="/promo/dragon.png"
                    alt="Lucky dragon"
                    fill
                    className="object-contain"
                    sizes="(min-width:768px) 280px, 80vw"
                    priority={false}
                  />
                </div>

                <div className="absolute left-10 top-10 z-10 space-y-3">
                  <Image
                    src="/logo.png"
                    alt="Gamble.gg"
                    width={180}
                    height={120}
                    priority={false}
                    className="h-auto w-[250px]"
                  />

                  <div
                    className={`${montserratItalic.className} font-black italic text-[72px] leading-[60px] tracking-normal py-1 w-150`}
                  >
                    200% BONUS UP TO $25,000
                  </div>

                  <div
                    className={`${montserratItalic.className} font-black italic text-[40px] leading-[60px] tracking-normal px-7 py-1 w-150 relative z-10`}
                  >
                    FREE SPINS
                  </div>

                  {/* Твой прямоугольник */}
                  <div
                    className="absolute"
                    style={{
                      width: "270px",
                      height: "62.5px",
                      left: "20px",
                      top: "200px",
                      background:
                        "linear-gradient(180deg, rgba(14,32,79,0.29) 0%, #0099FF 100%)",
                      boxShadow: "inset 0px 4px 4px rgba(23,54,106,0.9)",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={"relative grid content-start gap-4 p-6 md:p-6"}>
            <div className="flex items-center gap-1 text-lg font-semibold">
              <Image
                src="/icons/users/user-id.png"
                alt="icon"
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "invert(64%) sepia(90%) saturate(5000%) hue-rotate(180deg) brightness(1.6)" }} 
              />
              <span className={`${montserrat.className}`}>
                Create an Account
              </span>
            </div>

            {/* Tabs */}
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#141A2E] p-1">
              <button
                onClick={() => setTab("register")}
                className={`${montserratForButtons.className} flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
                  tab === "register"
                    ? "bg-gradient-to-r from-sky-500 to-sky-400 text-wihite"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setTab("login")}
                className={`${montserratForButtons.className} flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
                  tab === "login"
                    ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                Log in
              </button>
            </div>

            {/* Auth form */}
            {tab === "register" ? (
              <form className="mt-2 grid gap-3">
                <LabeledInput label="Username" placeholder="Username" />
                <LabeledInput label="E-mail" placeholder="Enter e-mail" type="email" />
                <LabeledInput label="Password" placeholder="Enter password" type="password" />
                <LabeledInput
                  label="Referral Code (optional)"
                  placeholder="Referral code"
                />

                <Button type="submit" variant="auth">
                  Register
                </Button>

                <OrDivider />
                <SocialRow />
              </form>
            ) : (
              <form className="mt-2 grid gap-3">
                <LabeledInput label="E-mail" placeholder="Enter e-mail" type="email" />
                <LabeledInput label="Password" placeholder="Enter password" type="password" />
                <Button type="submit" variant="auth">
                  Log in
                </Button>

                <OrDivider />
                <SocialRow />
              </form>
            )}
          </div>
        </div>
      </DialogRoot>
    </>
  );
}

function LabeledInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span
        className={`${montserratForButtons.className} font-black italic text-[12px] leading-[20px] text-gray-300`}
      >
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={`h-11 rounded-xl bg-[#141A2E] px-3 text-sm text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-sky-500`}
      />
    </label>
  );
}

function OrDivider() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-gray-400">
      <span className="h-px w-full bg-white/10" />
      <span>OR</span>
      <span className="h-px w-full bg-white/10" />
    </div>
  );
}

function SocialRow() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button className="h-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center">
        <Image
          src="/icons/other/google.png"
          alt="Google"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>

      <button className="h-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center">
        <Image
          src="/icons/other/metamask.png"
          alt="Metamask"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>

      <button className="h-11 rounded-xl bg-[#141A2E] hover:bg-white/5 flex items-center justify-center">
        <Image
          src="/icons/other/steam.png"
          alt="Steam"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>
    </div>
  );
}
