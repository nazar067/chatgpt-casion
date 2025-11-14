"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useResetPassModal } from "./store/useResetPassModal";

export function ResetPassLinkListener() {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const openedRef = useRef(false);
  const { open } = useResetPassModal();

  useEffect(() => {
    if (openedRef.current) return;

    const token =
      search.get("token") ||
      search.get("reset_token") ||
      search.get("rp");

    if (token) {
      openedRef.current = true;
      open(token);

      const url = pathname;
      router.replace(url as any, { scroll: false });
    }
  }, [search, pathname, router, open]);

  return null;
}
