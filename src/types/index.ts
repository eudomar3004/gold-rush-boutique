export type Category = "nuevos" | "caballeros" | "damas" | "unisex";

export type OlfactoryNote =
  | "floral"
  | "dulce"
  | "amaderado"
  | "citrico"
  | "oriental"
  | "fresco"
  | "almizclado"
  | "especiado"
  | "lavanda"
  | "pimienta";

export interface Product {
  id: string;
  client_id: string;
  name: string;
  brand: string | null;
  description: string | null;
  category: Category;
  price_30ml: number | null;
  price_50ml: number | null;
  image_url: string | null;
  olfactory_notes: OlfactoryNote[];
  in_stock: boolean;
  created_at: string;
}

export interface Order {
  id?: string;
  client_id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  customer_phone: string;
  size: "30ml" | "50ml";
  quantity: number;
  unit_price: number;
  total: number;
  status?: string;
  notes?: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  size: "30ml" | "50ml";
  quantity: number;
  unit_price: number;
}
