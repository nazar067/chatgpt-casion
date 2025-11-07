"use client";
import { create } from "zustand";

type WalletMode = "deposit" | "withdraw";
type DepositMethod = "fiat" | "crypto";

type State = {
  isOpen: boolean;
  mode: WalletMode;
  method: DepositMethod;
  openDeposit: (initial?: Partial<Pick<State, "method">>) => void;
  openWithdraw: () => void;
  close: () => void;
  setMethod: (m: DepositMethod) => void;
  setMode: (m: WalletMode) => void;
};

export const useDepositModal = create<State>((set) => ({
  isOpen: false,
  mode: "deposit",
  method: "fiat",
  openDeposit: (initial) =>
    set({
      isOpen: true,
      mode: "deposit",
      method: initial?.method ?? "fiat",
    }),
  openWithdraw: () => set({ isOpen: true, mode: "withdraw" }),
  close: () => set({ isOpen: false }),
  setMethod: (m) => set({ method: m }),
  setMode: (m) => set({ mode: m }),
}));
