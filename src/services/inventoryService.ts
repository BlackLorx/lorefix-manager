import { supabase } from "../lib/supabase";
import type { Inventory } from "../types/Inventory";

export async function getInventory() {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("nombre");

  console.log("Inventory DATA:", data);
  console.log("Inventory ERROR:", error);

  if (error) throw error;

  return data as Inventory[];
}

export async function createInventory(item: Omit<Inventory, "id">) {
  const { data, error } = await supabase
    .from("inventory")
    .insert(item)
    .select()
    .single();

  if (error) throw error;

  return data as Inventory;
}

export async function updateInventory(item: Inventory) {
  const { error } = await supabase
    .from("inventory")
    .update({
      nombre: item.nombre,
      categoria: item.categoria,
      subcategoria: item.subcategoria,
      marca: item.marca,
      proveedor: item.proveedor,
      ubicacion: item.ubicacion,
      stock: item.stock,
      stock_minimo: item.stock_minimo,
      precio_compra: item.precio_compra,
      precio_venta: item.precio_venta,
      observaciones: item.observaciones,
    })
    .eq("id", item.id);

  if (error) throw error;
}

export async function deleteInventory(id: number) {
  const { error } = await supabase
    .from("inventory")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function increaseStock(item: Inventory) {
  const nuevoStock = item.stock + 1;

  const { error } = await supabase
    .from("inventory")
    .update({
      stock: nuevoStock,
    })
    .eq("id", item.id);

  if (error) throw error;

  const { error: movementError } = await supabase
    .from("inventory_movements")
    .insert({
      inventory_id: item.id,
      tipo: "Entrada",
      cantidad: 1,
      motivo: "Ajuste manual",
    });

  if (movementError) throw movementError;

  return {
    ...item,
    stock: nuevoStock,
  };
}

export async function decreaseStock(item: Inventory) {
  const nuevoStock = Math.max(0, item.stock - 1);

  const { error } = await supabase
    .from("inventory")
    .update({
      stock: nuevoStock,
    })
    .eq("id", item.id);

  if (error) throw error;

  const { error: movementError } = await supabase
    .from("inventory_movements")
    .insert({
      inventory_id: item.id,
      tipo: "Salida",
      cantidad: -1,
      motivo: "Ajuste manual",
    });

  if (movementError) throw movementError;

  return {
    ...item,
    stock: nuevoStock,
  };
}