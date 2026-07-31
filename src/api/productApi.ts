import { baseApi } from "./baseApi";
import type { Product } from "../types/models.types";
import type { CreateProductInput, UpdateProductInput } from "../types/product.types";
import type { Category } from "../types/models.types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllProducts: builder.query<{ products: Product[] }, Category | void>({
  query: (category) => (category ? `/products?category=${category}` : "/products"),
  providesTags: ["Product"],
}),

    getProductById: builder.query<{ product: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    getMyProducts: builder.query<{ products: Product[] }, void>({
      query: () => "/products/me/products",
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<{ product: Product }, CreateProductInput>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<{ product: Product }, { id: string; body: UpdateProductInput }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getAllProductsForAdmin: builder.query<{ products: Product[] }, void>({
  query: () => "/products/admin/all",
  providesTags: ["Product"],
}),

deleteProductAsAdmin: builder.mutation<void, string>({
  query: (id) => ({
    url: `/products/${id}/admin`,
    method: "DELETE",
  }),
  invalidatesTags: ["Product"],
}),

  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetMyProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsForAdminQuery,
  useDeleteProductAsAdminMutation,
} = productApi;