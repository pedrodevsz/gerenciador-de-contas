"use client";

import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import useAuthStore from "@/store/auth/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((state) => state.setSession);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session) {
        setSession(session);
        return;
      }

      clearAuth();
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      if (!isMounted) {
        return;
      }

      if (session) {
        setSession(session);
        return;
      }

      clearAuth();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearAuth, setLoading, setSession]);

  return children;
}
