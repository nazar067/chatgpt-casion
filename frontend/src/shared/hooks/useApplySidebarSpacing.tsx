"use client";
import { useEffect } from "react";
import { useSidebar } from "@/shared/context/SidebarContext";

export const ApplySidebarSpacing: React.FC = () => {
  const { isOpen } = useSidebar();
  useEffect(() => {
    const el = document.getElementById("app-main");
    if (!el) return;
    if (isOpen) el.removeAttribute("data-compact");
    else el.setAttribute("data-compact", "true");
  }, [isOpen]);
  return null;
};
