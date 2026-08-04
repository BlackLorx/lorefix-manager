import { supabase } from "../lib/supabase";

export type Settings = {
  id: number;
  shop_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  tax_id: string;
  logo: string | null;
};

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) throw error;

  return data as Settings;
}

export async function updateSettings(
  settings: Settings
) {
  const { data, error } = await supabase
    .from("settings")
    .update({
      shop_name: settings.shop_name,
      address: settings.address,
      phone: settings.phone,
      email: settings.email,
      website: settings.website,
      tax_id: settings.tax_id,
      logo: settings.logo,
    })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;

  return data as Settings;
}