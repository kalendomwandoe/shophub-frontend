import { baseApi } from "./baseApi";
import type { User } from "../types/models.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ users: User[] }, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    suspendUser: builder.mutation<{ user: User }, string>({
      query: (id) => ({
        url: `/users/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    unsuspendUser: builder.mutation<{ user: User }, string>({
      query: (id) => ({
        url: `/users/${id}/unsuspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
} = userApi;