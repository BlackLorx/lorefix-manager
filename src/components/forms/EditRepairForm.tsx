import { useState } from "react";
import type { Repair } from "../../types/Repair";
import { supabase } from "../../lib/supabase";

type Props = {
  repair: Repair;
  onSave: (repair: Repair) => void;
  onDelete: (id: number) => void;
};

export default function EditRepairForm({
  repair,
  onSave,
  onDelete,
}: Props) {
  const [data, setData] = useState(repair);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Repair>(key: K, value: Repair[K]) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function guardarCambios() {
    setSaving(true);

    // Guardamos el estado anterior
    const estadoAnterior = repair.estado;

    const { error } = await supabase
      .from("repairs")
      .update({
        cliente: data.cliente,
        telefono: data.telefono,
        dispositivo: `${data.marca} ${data.modelo}`,
        marca: data.marca,
        modelo: data.modelo,
        imei: data.imei,
        averia: data.averia,
        estado: data.estado,
      })
      .eq("id", data.id);

    if (error) {
      setSaving(false);
      console.error(error);
      return;
    }

if (estadoAnterior !== data.estado) {
  const { error: historyError } = await supabase
    .from("repair_history")
    .insert({
      repair_id: data.id,
      estado: data.estado,
      comentario: `Estado cambiado de "${estadoAnterior}" a "${data.estado}"`,
    });

  if (historyError) {
    console.error("ERROR HISTORIAL:", historyError);
    alert(JSON.stringify(historyError));
  }
}

    setSaving(false);

    onSave({
      ...data,
      dispositivo: `${data.marca} ${data.modelo}`,
    });
  }

  async function eliminarReparacion() {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta reparación?"
    );

    if (!confirmar) return;

    setSaving(true);

    const { error } = await supabase
      .from("repairs")
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
        value={data.cliente}
        onChange={(e) => update("cliente", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.telefono}
        onChange={(e) => update("telefono", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.marca}
        onChange={(e) => update("marca", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.modelo}
        onChange={(e) => update("modelo", e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        value={data.imei}
        onChange={(e) => update("imei", e.target.value)}
      />

      <textarea
        className="w-full rounded-xl border p-3"
        rows={5}
        value={data.averia}
        onChange={(e) => update("averia", e.target.value)}
      />

      <select
        className="w-full rounded-xl border p-3"
        value={data.estado}
        onChange={(e) =>
          update("estado", e.target.value as Repair["estado"])
        }
      >
        <option>Pendiente</option>
        <option>Recibido</option>
        <option>Diagnóstico</option>
        <option>Esperando piezas</option>
        <option>Reparando</option>
        <option>Terminado</option>
        <option>Entregado</option>
      </select>

      <div className="flex gap-3">
        <button
          onClick={guardarCambios}
          disabled={saving}
          className="flex-1 rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          onClick={eliminarReparacion}
          disabled={saving}
          className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}