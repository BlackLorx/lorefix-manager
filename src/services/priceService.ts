import { supabase } from "../lib/supabase";
import type { Price } from "../types/Price";

export async function getPrices() {
  const { data, error } = await supabase
    .from("service_prices")
    .select("*")
    .eq("active", true)
    .order("brand")
    .order("device")
    .order("service");

  if (error) throw error;

  return data as Price[];
}

export async function createPrice(price: Omit<Price, "id">) {
  const { error } = await supabase
    .from("service_prices")
    .insert(price);

  if (error) throw error;
}

export async function updatePrice(price: Price) {
  const { error } = await supabase
    .from("service_prices")
    .update(price)
    .eq("id", price.id);

  if (error) throw error;
}

export async function deletePrice(id: number) {
  const { error } = await supabase
    .from("service_prices")
    .delete()
    .eq("id", id);

  if (error) throw error;
}