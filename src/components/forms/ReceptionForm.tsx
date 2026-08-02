import { useState } from "react";
import type { Repair } from "../../types/Repair";
import { supabase } from "../../lib/supabase";
import { generarResguardo } from "../../services/pdfService";

type Props = {
  onSave: (repair: Repair) => void;
};

export default function ReceptionForm({ onSave }: Props) {
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [imei, setImei] = useState("");
  const [averia, setAveria] = useState("");
  const [saving, setSaving] = useState(false);

  async function guardar() {
    setSaving(true);

    const repair: Repair = {
      id: Date.now(),
      cliente,
      telefono,
      dispositivo: `${marca} ${modelo}`,
      marca,
      modelo,
      imei,
      averia,
      estado: "Pendiente",
    };

    const { data, error } = await supabase
      .from("repairs")
      .insert({
        cliente: repair.cliente,
        telefono: repair.telefono,
        dispositivo: repair.dispositivo,
        marca: repair.marca,
        modelo: repair.modelo,
        imei: repair.imei,
        averia: repair.averia,
        estado: repair.estado,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error al guardar en Supabase");
      setSaving(false);
      return;
    }

    // Generar código
    const codigo = `LF-${String(data.id).padStart(6, "0")}`;

    await supabase
      .from("repairs")
      .update({ codigo })
      .eq("id", data.id);

const repairCompleta: Repair = {
  ...data,
  codigo,
};

await supabase.from("repair_history").insert({
  repair_id: data.id,
  estado: "Pendiente",
  comentario: "Recepción creada",
});

    try {
      // Generar PDF y subirlo a Storage
      const pdf_url = await generarResguardo(repairCompleta);

      // Guardar URL en la reparación
      await supabase
        .from("repairs")
        .update({ pdf_url })
        .eq("id", data.id);

      repairCompleta.pdf_url = pdf_url;
    } catch (e) {
      console.error("Error generando PDF", e);
    }

const mensaje = `Hola ${repairCompleta.cliente} 

Tu reparación ha sido registrada correctamente.

Seguimiento:
https://lorefix-manager.vercel.app/seguimiento/${repairCompleta.codigo}

Resguardo:
${repairCompleta.pdf_url ?? "No disponible"}

Gracias por confiar en LoreFix.`;

const telefonoWhatsapp = repairCompleta.telefono.replace(/\D/g, "");

window.open(
  `https://wa.me/34${telefonoWhatsapp}?text=${encodeURIComponent(mensaje)}`,
  "_blank"
);

    setSaving(false);

    onSave(repairCompleta);
  }

  return (
    <div className="space-y-5">
      <input
        placeholder="Cliente"
        className="w-full rounded-xl border p-3"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <input
        placeholder="Teléfono"
        className="w-full rounded-xl border p-3"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <input
        placeholder="Marca"
        className="w-full rounded-xl border p-3"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
      />

      <input
        placeholder="Modelo"
        className="w-full rounded-xl border p-3"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />

      <input
        placeholder="IMEI"
        className="w-full rounded-xl border p-3"
        value={imei}
        onChange={(e) => setImei(e.target.value)}
      />

      <textarea
        placeholder="Avería"
        className="w-full rounded-xl border p-3"
        rows={5}
        value={averia}
        onChange={(e) => setAveria(e.target.value)}
      />

      <button
        onClick={guardar}
        disabled={saving}
        className="w-full rounded-xl bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar reparación"}
      </button>
    </div>
  );
}