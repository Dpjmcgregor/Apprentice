import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Lightweight stand-in for Clerk. The product brief specifies Clerk for the
// brand/HR workspace; for this client-side MVP we model a signed-in session
// with a localStorage flag so the workspace can be gated and the applicant
// experience stays login-free.

export type Role = "brand_admin" | "hr_manager";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: SessionUser | null;
  signIn: (user?: Partial<SessionUser>) => void;
  signOut: () => void;
}

const AUTH_KEY = "rdr:session:v1";

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: SessionUser = {
  name: "Jordan Lee",
  email: "jordan@novaco.example",
  role: "brand_admin",
};

function loadUser(): SessionUser | null {
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(loadUser);

  useEffect(() => {
    try {
      if (user) window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
  }, [user]);

  const signIn = useCallback((patch?: Partial<SessionUser>) => {
    setUser({ ...DEMO_USER, ...patch });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
