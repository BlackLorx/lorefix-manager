import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import { getProfile } from "../services/profileService";

type Role = "admin" | "technician" | "viewer";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  role: Role | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  role: null,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      if (data.session?.user) {
        try {
          const profile = await getProfile(data.session.user.id);
          setRole(profile.role);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session?.user) {
        try {
          const profile = await getProfile(session.user.id);
          setRole(profile.role);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}