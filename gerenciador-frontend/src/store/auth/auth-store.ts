"use client";

import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
  isLoading: boolean;
  isInitialized: boolean;
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isInitialized: false,
  session: null,
  user: null,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isInitialized: true,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () =>
    set({
      session: null,
      user: null,
      isInitialized: true,
      isLoading: false,
    }),
}));

export default useAuthStore;
