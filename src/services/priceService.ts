import { supabase } from "../lib/supabase";
import type { Price } from "../types/Price";


export async function getPrices() {

  const { data, error } = await supabase
    .from("service_prices")
    .select(`
      *,
      brands (
        id,
        name
      ),
      devices (
        id,
        name
      )
    `)
    .order("category")
    .order("service");


  if (error) {
    throw error;
  }


  return data as unknown as Price[];

}



export async function getPublicPrices() {

  const { data, error } = await supabase
    .from("service_prices")
    .select(`
      *,
      brands (
        id,
        name
      ),
      devices (
        id,
        name
      )
    `)
    .eq("public", true)
    .eq("active", true)
    .order("category")
    .order("service");


  if (error) {
    throw error;
  }


  return data as unknown as Price[];

}




export async function createPrice(
  price: Omit<Price, "id">
) {


  const { data, error } = await supabase
    .from("service_prices")
    .insert({

      brand_id: price.brand_id,
      device_id: price.device_id,

      brand: price.brand,
      device: price.device,

      category: price.category,
      service: price.service,

      price: price.price,

      description: price.description,

      public: price.public,
      active: price.active,

    })
    .select(`
      *,
      brands (
        id,
        name
      ),
      devices (
        id,
        name
      )
    `)
    .single();



  if (error) {
    throw error;
  }


  return data as unknown as Price;

}





export async function updatePrice(
  price: Price
) {


  const { data, error } = await supabase
    .from("service_prices")
    .update({

      brand_id: price.brand_id,
      device_id: price.device_id,

      brand: price.brand,
      device: price.device,

      category: price.category,

      service: price.service,

      price: price.price,

      description: price.description,

      public: price.public,

      active: price.active,

    })
    .eq("id", price.id)
    .select(`
      *,
      brands (
        id,
        name
      ),
      devices (
        id,
        name
      )
    `)
    .single();



  if (error) {
    throw error;
  }


  return data as unknown as Price;

}





export async function deletePrice(
  id: number
) {


  const { error } = await supabase
    .from("service_prices")
    .delete()
    .eq("id", id);



  if (error) {
    throw error;
  }

}