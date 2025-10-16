import { cn } from "@/shared/lib/cn";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primaryAuth" | "secondaryAuth" | "ghost" | "auth";
};

export function Button({ className, variant = "primaryAuth", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none";

  const styles = {
    primaryAuth: `${montserrat.className} bg-sky-500 text-white hover:bg-sky-400`,
    secondaryAuth: `${montserrat.className} bg-[#1A1F35] text-white hover:bg-[#232941]`,
    ghost: "bg-transparent text-gray-300 hover:bg-white/10",
    auth: `${montserrat.className} mt-1 h-12 w-full rounded-xl bg-amber-400 text-base font-semibold text-black hover:bg-amber-300`
  }[variant];

  return <button className={cn(base, styles, className)} {...props} />;
}
