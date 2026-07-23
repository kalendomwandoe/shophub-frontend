export type UserRole = "ADMIN" | "OWNER" | "CUSTOMER";
export type Category =
  | "WOMENS_FASHION"
  | "MENS_FASHION"
  | "SHOES"
  | "BAGS"
  | "JEWELRY"
  | "BEAUTY";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  isApproved: boolean;
  isSuspended: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}


export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  category: Category;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  shop?: Shop;
}