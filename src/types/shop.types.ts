export interface CreateShopInput {
  name: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export interface UpdateShopInput {
  name?: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}