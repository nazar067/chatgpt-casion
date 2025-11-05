"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

export default function SocialIcon({
  href,
  src,
  alt,
  className,
}: {
  href: string;
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "grid h-11 w-11 place-items-center rounded-xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition",
        className
      )}
      aria-label={alt}
    >
      <Image src={src} alt={alt} width={20} height={20} />
    </Link>
  );
}
