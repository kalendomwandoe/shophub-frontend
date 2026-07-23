import { baseApi } from "./baseApi";
import type { User } from "../types/models.types";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: "OWNER" | "CUSTOMER";
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

interface RegisterResponse {
  message: string;
  user: User;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;