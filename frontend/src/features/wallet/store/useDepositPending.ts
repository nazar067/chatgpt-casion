"use client";
import { create } from "zustand";
import type { DepositStatus } from "@/shared/api/wallet";

type State = {
  isOpen: boolean;
  txId: string | null;
  status: DepositStatus;
  open: (txId: string) => void;
  setStatus: (s: DepositStatus) => void;
  close: () => void;
};

export const useDepositPending = create<State>((set) => ({
  isOpen: false,
  txId: null,
  status: "pending",
  open: (txId) => set({ isOpen: true, txId, status: "pending" }),
  setStatus: (s) => set({ status: s }),
  close: () => set({ isOpen: false, txId: null, status: "pending" }),
}));
