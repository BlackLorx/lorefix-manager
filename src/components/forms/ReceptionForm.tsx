import { useState } from "react";
import type { Repair } from "../../types/Repair";
import { supabase } from "../../lib/supabase";

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

  async function guardar() {
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

    const { error } = await supabase
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
      });

    if (error) {
      console.error(error);
      alert("Error al guardar en Supabase");
      return;
    }

    onSave(repair);
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
        className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
      >
        Guardar reparación
      </button>

    </div>
  );
}