"use client";
import React from "react";

type AuthState = { isAuthenticated: boolean; login: () => void; logout: () => void };
const AuthCtx = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuth] = React.useState(true);
  const value = React.useMemo(
    () => ({ isAuthenticated, login: () => setAuth(true), logout: () => setAuth(false) }),
    [isAuthenticated]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
