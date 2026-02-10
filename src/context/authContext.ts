import { createContext } from "react";
import type { User } from "../utilities/authUtils";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string) => Promise<void>;
  signup: (identifier: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
