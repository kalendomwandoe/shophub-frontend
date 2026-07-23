import { baseApi } from "./baseApi";
import type { Shop } from "../types/models.types";
import type { CreateShopInput, UpdateShopInput } from "../types/shop.types";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query<{ shops: Shop[] }, void>({
      query: () => "/shops",
      providesTags: ["Shop"],
    }),

    getShopById: builder.query<{ shop: Shop }, string>({
      query: (id) => `/shops/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Shop", id }],
    }),

    getMyShop: builder.query<{ shop: Shop }, void>({
      query: () => "/shops/me/shop",
      providesTags: ["Shop"],
    }),

    createShop: builder.mutation<{ shop: Shop }, CreateShopInput>({
      query: (body) => ({
        url: "/shops",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Shop"],
    }),

    updateMyShop: builder.mutation<{ shop: Shop }, UpdateShopInput>({
      query: (body) => ({
        url: "/shops/me/shop",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});

export const {
  useGetAllShopsQuery,
  useGetShopByIdQuery,
  useGetMyShopQuery,
  useCreateShopMutation,
  useUpdateMyShopMutation,
} = shopApi;