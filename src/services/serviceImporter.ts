import { supabase } from "../lib/supabase";
import { SERVICES } from "../data/services";

export async function importServices() {

  const { data: brands, error: brandsError } =
    await supabase
      .from("brands")
      .select("id,name");

  if (brandsError) throw brandsError;

  for (const brand of brands) {

    const { data: devices, error: devicesError } =
      await supabase
        .from("devices")
        .select("id,name")
        .eq("brand_id", brand.id);

    if (devicesError) throw devicesError;

    for (const device of devices) {

      for (const category of SERVICES) {

        for (const service of category.items) {

          const { data: existing } =
            await supabase
              .from("service_prices")
              .select("id")
              .eq("brand_id", brand.id)
              .eq("device_id", device.id)
              .eq("service", service.name)
              .maybeSingle();

          if (existing) continue;

          const { error } =
            await supabase
              .from("service_prices")
              .insert({

                brand_id: brand.id,
                device_id: device.id,

                brand: brand.name,
                device: device.name,

                category: category.category,

                service: service.name,

                price: service.price,

                description: "",

                public: true,

                active: true,

              });

          if (error) throw error;

        }

      }

    }

  }

}