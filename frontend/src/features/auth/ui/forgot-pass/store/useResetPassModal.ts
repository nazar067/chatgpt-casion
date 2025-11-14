"use client";
import { create } from "zustand";

type ResetPassState = {
  isOpen: boolean;
  token: string | null;
  open: (token: string) => void;
  close: () => void;
  clear: () => void;
};

export const useResetPassModal = create<ResetPassState>((set) => ({
  isOpen: false,
  token: null,
  open: (token) => set({ isOpen: true, token }),
  close: () => set({ isOpen: false }),
  clear: () => set({ token: null }),
}));
