import { createClient } from "@supabase/supabase-js";
import type { Product, Order } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

// ── Products ──────────────────────────────────────────────────

export async function getProducts(category?: string, search?: string) {
  let query = supabase
    .from("products")
    .select("*")
    .eq("client_id", CLIENT_ID)
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (category && category !== "todos") {
    query = query.eq("category", category);
  }

  if (search && search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Product[];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("client_id", CLIENT_ID)
    .single();

  if (error) throw error;
  return data as Product;
}

// ── Orders ────────────────────────────────────────────────────

export async function createOrder(order: Omit<Order, "id" | "created_at" | "status">) {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ ...order, client_id: CLIENT_ID, status: "pending" }])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}
