"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

let lockCount = 0;

function lockScroll() {
  if (lockCount++ === 0) {
    const html = document.documentElement;
    html.setAttribute("data-dialog-locked", "true");
    html.style.overflow = "hidden";
  }
}

function unlockScroll() {
  if (lockCount > 0 && --lockCount === 0) {
    const html = document.documentElement;
    html.removeAttribute("data-dialog-locked");
    html.style.overflow = "";
  }
}

function setMainInert(enabled: boolean) {
  const main = document.getElementById("app-main");
  if (!main) return;
  if (enabled) {
    main.setAttribute("inert", "");
    main.setAttribute("aria-hidden", "true");
  } else {
    main.removeAttribute("inert");
    main.removeAttribute("aria-hidden");
  }
}

type DialogRootProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  contentClassName?: string;
  backdropClassName?: string;
};

export function DialogRoot({
  open,
  onClose,
  children,
  contentClassName = "",
  backdropClassName = "",
}: DialogRootProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      lockScroll();
      setMainInert(true);
    } else {
      setMainInert(false);
      unlockScroll();
    }
    return () => {
      setMainInert(false);
      unlockScroll();
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden={false}
          className={`fixed inset-0 z-[100] grid place-items-center ${backdropClassName}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
            className={contentClassName}
            initial={{ y: "-20vh", opacity: 0, scale: 0.98 }}
            animate={{ y: "0vh", opacity: 1, scale: 1 }}
            exit={{ y: "-20vh", opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
