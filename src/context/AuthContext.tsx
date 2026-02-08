import { createContext, useContext, useEffect, useState } from "react";

/* ===============================
   TYPES
================================ */

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  memberSince: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (identifier: string, name?: string) => void;
  logout: () => void;
}

/* ===============================
   CONTEXT
================================ */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const generateUUID = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for insecure contexts (IP address, HTTP)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/* ===============================
   USERNAME GENERATOR
================================ */

function generateUsername(identifier: string, name?: string): string {
  if (name) {
    // Use provided name to create username
    return name
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "");
  }

  // Check if identifier is email or phone
  const isEmail = /\S+@\S+\.\S+/.test(identifier);

  if (isEmail) {
    // Use email local part
    return identifier
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, "");
  } else {
    // For phone numbers, generate a username
    return `user_${identifier.slice(-4)}`;
  }
}

function formatDisplayName(identifier: string, name?: string): string {
  if (name) {
    // Capitalize each word properly
    return name
      .split(/[\s._]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // Check if identifier is email
  const isEmail = /\S+@\S+\.\S+/.test(identifier);

  if (isEmail) {
    // Extract name from email
    const emailName = identifier.split("@")[0];
    return emailName
      .split(/[\s._]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    // For phone numbers
    return `User ${identifier.slice(-4)}`;
  }
}

/* ===============================
   VALIDATION
================================ */

function isValidIdentifier(identifier: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  return emailRegex.test(identifier) || phoneRegex.test(identifier);
}

/* ===============================
   PROVIDER
================================ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  /* Restore session on refresh */
  useEffect(() => {
    const storedUser = localStorage.getItem("tohfa_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tohfa_user");
      }
    }
  }, []);

  /* Derived state */
  const isLoggedIn = !!user;

  /* ===============================
     LOGIN
  ================================ */
  const login = (identifier: string, name?: string) => {
    // Validate identifier
    if (!isValidIdentifier(identifier)) {
      console.error("Invalid identifier format");
      return;
    }

    const displayName = formatDisplayName(identifier, name);
    const username = generateUsername(identifier, name);

    // Determine email based on identifier
    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const email = isEmail ? identifier : `${username}@tohfa.com`;

    const mockUser: User = {
      id: generateUUID(),
      username,
      name: displayName,
      email,
      memberSince: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };

    localStorage.setItem("tohfa_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  /* ===============================
     LOGOUT
  ================================ */
  const logout = () => {
    localStorage.removeItem("tohfa_user");
    setUser(null);
  };

  /* ===============================
     CONTEXT VALUE
  ================================ */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ===============================
   HOOK
================================ */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
