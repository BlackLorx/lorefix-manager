import { supabase } from "../lib/supabase";

export async function getDevices(
  brandId: number
) {
  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .eq("brand_id", brandId)
    .eq("active", true)
    .order("name");

  if (error) throw error;

  return data;
}