"use client";
import { create } from "zustand";

type ForgotPassState = {
  isOpen: boolean;
  email: string;
  open: (email?: string) => void;
  close: () => void;
  setEmail: (v: string) => void;
};

export const useForgotPassModal = create<ForgotPassState>((set) => ({
  isOpen: false,
  email: "",
  open: (email) => set({ isOpen: true, email: email ?? "" }),
  close: () => set({ isOpen: false }),
  setEmail: (v) => set({ email: v }),
}));
