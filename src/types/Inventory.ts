export type Inventory = {
  id: number;

  created_at?: string;

  nombre: string;

  categoria: string;

  subcategoria: string;

  marca: string;

  proveedor: string;

  ubicacion: string;

  stock: number;

  stock_minimo: number;

  precio_compra: number;

  precio_venta: number;

  observaciones: string;
};