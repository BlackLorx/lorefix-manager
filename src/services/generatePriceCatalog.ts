import { supabase } from "../lib/supabase";

export async function generatePriceCatalog() {

  // Obtener marcas
  const { data: brands, error: brandsError } = await supabase
    .from("brands")
    .select("id,name");

  if (brandsError) throw brandsError;

  // Obtener dispositivos
  const { data: devices, error: devicesError } = await supabase
    .from("devices")
    .select("id,brand_id,name");

  if (devicesError) throw devicesError;

  // Obtener catálogo de servicios
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("id,category,name,default_price")
    .eq("active", true);

  if (servicesError) throw servicesError;

  for (const brand of brands) {

    const brandDevices = devices.filter(
      (d) => d.brand_id === brand.id
    );

    for (const device of brandDevices) {

      for (const service of services) {

        const { data: existing } = await supabase
          .from("service_prices")
          .select("id")
          .eq("brand_id", brand.id)
          .eq("device_id", device.id)
          .eq("service", service.name)
          .maybeSingle();

        if (existing) continue;

        const { error } = await supabase
          .from("service_prices")
          .insert({

            brand_id: brand.id,
            device_id: device.id,

            brand: brand.name,
            device: device.name,

            category: service.category,
            service: service.name,

            price: service.default_price,

            description: "",

            public: true,
            active: true,

          });

        if (error) throw error;

      }

    }

  }

}