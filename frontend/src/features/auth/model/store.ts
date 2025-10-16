import { create } from "zustand";

export type AuthTab = "login" | "register";

type State = {
  open: boolean;
  tab: AuthTab;
  openWith: (tab: AuthTab) => void;
  close: () => void;
  setTab: (tab: AuthTab) => void;
};

export const useAuthModal = create<State>((set) => ({
  open: false,
  tab: "register",
  openWith: (tab) => set({ open: true, tab }),
  close: () => set({ open: false }),
  setTab: (tab) => set({ tab }),
}));
