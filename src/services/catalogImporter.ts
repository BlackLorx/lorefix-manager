import { supabase } from "../lib/supabase";
import { CATALOG } from "../data/catalog";

export async function importCatalog() {
  for (const brand of CATALOG) {

    // Buscar si la marca ya existe
    let { data: existingBrand } = await supabase
      .from("brands")
      .select("id")
      .eq("name", brand.brand)
      .maybeSingle();

    let brandId: number;

    if (!existingBrand) {
      const { data, error } = await supabase
        .from("brands")
        .insert({
          name: brand.brand,
        })
        .select()
        .single();

      if (error) throw error;

      brandId = data.id;
    } else {
      brandId = existingBrand.id;
    }

    // Crear dispositivos de la marca
    for (const device of brand.devices) {
      const { data: existingDevice } = await supabase
        .from("devices")
        .select("id")
        .eq("brand_id", brandId)
        .eq("name", device)
        .maybeSingle();

      if (!existingDevice) {
        const { error } = await supabase
          .from("devices")
          .insert({
            brand_id: brandId,
            name: device,
          });

        if (error) throw error;
      }
    }
  }
}