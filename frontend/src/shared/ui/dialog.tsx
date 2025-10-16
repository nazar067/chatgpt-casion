"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
          className={`fixed inset-0 z-50 grid place-items-center ${backdropClassName}`}
          onClick={onClose}
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
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