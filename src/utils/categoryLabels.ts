import type { Category } from "../types/models.types";

export const categoryLabels: Record<Category, string> = {
  WOMENS_FASHION: "Women's Fashion",
  MENS_FASHION: "Men's Fashion",
  SHOES: "Shoes",
  BAGS: "Bags",
  JEWELRY: "Jewelry",
  BEAUTY: "Beauty",
};

export const categoryOptions: { value: Category; label: string }[] = (
  Object.keys(categoryLabels) as Category[]
).map((value) => ({ value, label: categoryLabels[value] }));