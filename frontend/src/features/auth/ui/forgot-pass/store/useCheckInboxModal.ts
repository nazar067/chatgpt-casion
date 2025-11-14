"use client";
import { create } from "zustand";

type CheckInboxState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCheckInboxModal = create<CheckInboxState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
