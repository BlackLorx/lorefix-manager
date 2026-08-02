import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Inventory } from "../../types/Inventory";

type Props = {
  item: Inventory;
  onSave: (item: Inventory) => void;
  onDelete: (id: number) => void;
};

export default function EditInventoryForm({
  item,
  onSave,
  onDelete,
}: Props) {
  const [data, setData] = useState(item);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Inventory>(
    key: K,
    value: Inventory[K]
  ) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function guardarCambios() {
    setSaving(true);

    const { error } = await supabase
      .from("inventory")
      .update({
        nombre: data.nombre,
        categoria: data.categoria,
        subcategoria: data.subcategoria,
        marca: data.marca,
        proveedor: data.proveedor,
        ubicacion: data.ubicacion,
        stock: data.stock,
        stock_minimo: data.stock_minimo,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        observaciones: data.observaciones,
      })
      .eq("id", data.id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Error al guardar.");
      return;
    }

    onSave(data);
  }

  async function eliminarArticulo() {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este artículo?"
    );

    if (!confirmar) return;

    setSaving(true);

    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", data.id);

    setSaving(false);

    if (error) {
      console.error(error);
      return;
    }

    onDelete(data.id);
  }

  return (
    <div className="space-y-4">

      <input
        className="w-full rounded-xl border p-3"
        value={data.nombre}
        onChange={(e) => update("nombre", e.target.value)}
      />

      <select
        className="w-full rounded-xl border p-3"
        value={data.categoria}
        onChange={(e) => update("categoria", e.target.value)}
      >
        <option>Repuesto</option>
        <option>Consumible</option>
        <option>Herramienta</option>
        <option>Material</option>
      </select>

      <input
        className="w-full rounded-xl border p-3"
        value={data.subcategoria}
        onChange={(e) => update("subcategoria", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.marca}
        onChange={(e) => update("marca", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.proveedor}
        onChange={(e) => update("proveedor", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.ubicacion}
        onChange={(e) => update("ubicacion", e.target.value)}
      />

      <input
        type="number"
        className="w-full rounded-xl border p-3"
        value={data.stock}
        onChange={(e) => update("stock", Number(e.target.value))}
      />

      <input
        type="number"
        className="w-full rounded-xl border p-3"
        value={data.stock_minimo}
        onChange={(e) =>
          update("stock_minimo", Number(e.target.value))
        }
      />

      <input
        type="number"
        step="0.01"
        className="w-full rounded-xl border p-3"
        value={data.precio_compra}
        onChange={(e) =>
          update("precio_compra", Number(e.target.value))
        }
      />

      <input
        type="number"
        step="0.01"
        className="w-full rounded-xl border p-3"
        value={data.precio_venta}
        onChange={(e) =>
          update("precio_venta", Number(e.target.value))
        }
      />

      <textarea
        rows={4}
        className="w-full rounded-xl border p-3"
        value={data.observaciones}
        onChange={(e) =>
          update("observaciones", e.target.value)
        }
      />

      <div className="flex gap-3">

        <button
          onClick={guardarCambios}
          disabled={saving}
          className="flex-1 rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          onClick={eliminarArticulo}
          disabled={saving}
          className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}