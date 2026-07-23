import type { User } from "./models.types";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  user: User;
  token: string;
}