"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;          // полноразмерный или компактный (иконки)
  setOpen: (v: boolean) => void;
  toggle: () => void;
  // для мобилок можно показывать выезжающую панель
  isSheetOpen: boolean;
  setSheetOpen: (v: boolean) => void;
  openSheet: () => void;
  closeSheet: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);        // desktop: открыт по умолчанию
  const [isSheetOpen, setIsSheetOpen] = useState(false); // mobile drawer

  const value = useMemo(() => ({
    isOpen,
    setOpen: setIsOpen,
    toggle: () => setIsOpen(v => !v),

    isSheetOpen,
    setSheetOpen: setIsSheetOpen,
    openSheet: () => setIsSheetOpen(true),
    closeSheet: () => setIsSheetOpen(false),
  }), [isOpen, isSheetOpen]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};
    