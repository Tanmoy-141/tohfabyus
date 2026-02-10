import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../utilities/authUtils";
import { AuthContext } from "./authContext";

import {
  generateUUID,
  generateUsername,
  formatDisplayName,
  isValidIdentifier,
} from "../utilities/authUtils";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("tohfa_user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem("tohfa_user");
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (identifier: string) => {
    setLoading(true);
    try {
      if (!isValidIdentifier(identifier)) {
        throw new Error("Invalid email, phone, or username");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUsers = localStorage.getItem("tohfa_users");
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        (u) =>
          u.email === identifier ||
          u.phone === identifier ||
          u.username === identifier,
      );

      if (!foundUser) {
        throw new Error("User not found. Please sign up first.");
      }

      setUser(foundUser);
      localStorage.setItem("tohfa_user", JSON.stringify(foundUser));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (identifier: string) => {
    setLoading(true);
    try {
      if (!isValidIdentifier(identifier)) {
        throw new Error("Invalid email, phone, or username");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUsers = localStorage.getItem("tohfa_users");
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.find(
        (u) =>
          u.email === identifier ||
          u.phone === identifier ||
          u.username === identifier,
      );

      if (existingUser) {
        throw new Error("User already exists. Please login.");
      }

      const newUser: User = {
        id: generateUUID(),
        displayName: formatDisplayName(identifier),
        createdAt: new Date().toISOString(),
      };

      if (identifier.includes("@")) {
        newUser.email = identifier;
        newUser.username = generateUsername(identifier);
      } else if (/^\+?[\d\s-()]+$/.test(identifier)) {
        newUser.phone = identifier;
        newUser.username = generateUsername(identifier);
      } else {
        newUser.username = identifier;
      }

      users.push(newUser);
      localStorage.setItem("tohfa_users", JSON.stringify(users));
      localStorage.setItem("tohfa_user", JSON.stringify(newUser));

      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tohfa_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
