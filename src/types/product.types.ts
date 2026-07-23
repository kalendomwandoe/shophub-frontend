import type { Category } from "./models.types";

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: Category;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  isActive?: boolean;
  category?: Category;
}