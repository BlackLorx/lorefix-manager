import { supabase } from "../lib/supabase";

export async function getServiceCatalog() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("category")
    .order("name");

  if (error) throw error;

  return data;
}

export async function importDefaultServices(
  services: {
    category: string;
    items: {
      name: string;
      price: number;
    }[];
  }[]
) {
  for (const category of services) {

    for (const service of category.items) {

      const { data: existing } = await supabase
        .from("services")
        .select("id")
        .eq("name", service.name)
        .maybeSingle();

      if (existing) continue;

      const { error } = await supabase
        .from("services")
        .insert({
          category: category.category,
          name: service.name,
          default_price: service.price,
          active: true,
        });

      if (error) throw error;

    }

  }
}