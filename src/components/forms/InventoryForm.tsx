import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Inventory } from "../../types/Inventory";

type Props = {
  onSave: (item: Inventory) => void;
};

export default function InventoryForm({ onSave }: Props) {
  const [saving, setSaving] = useState(false);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Repuesto");
  const [subcategoria, setSubcategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [stock, setStock] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);
  const [precioCompra, setPrecioCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  async function guardar() {
    setSaving(true);

    const { data, error } = await supabase
      .from("inventory")
      .insert({
        nombre,
        categoria,
        subcategoria,
        marca,
        proveedor,
        ubicacion,
        stock,
        stock_minimo: stockMinimo,
        precio_compra: precioCompra,
        precio_venta: precioVenta,
        observaciones,
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Error al guardar el artículo.");
      return;
    }

    onSave(data as Inventory);
  }

  return (
    <div className="space-y-4">

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option>Repuesto</option>
        <option>Consumible</option>
        <option>Herramienta</option>
        <option>Material</option>
      </select>

      <input
        placeholder="Subcategoría"
        value={subcategoria}
        onChange={(e) => setSubcategoria(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Proveedor"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="number"
        placeholder="Stock mínimo"
        value={stockMinimo}
        onChange={(e) => setStockMinimo(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Precio compra"
        value={precioCompra}
        onChange={(e) => setPrecioCompra(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Precio venta"
        value={precioVenta}
        onChange={(e) => setPrecioVenta(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <textarea
        placeholder="Observaciones"
        rows={4}
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <button
        onClick={guardar}
        disabled={saving}
        className="w-full rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700"
      >
        {saving ? "Guardando..." : "Guardar artículo"}
      </button>

    </div>
  );
}