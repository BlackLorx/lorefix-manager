import { useState } from "react";
import type { Appointment } from "../../types/Appointment";

import { createAppointment } from "../../services/appointmentService";

type Props = {
  onSave: (appointment: Appointment) => void;
};

export default function AppointmentForm({
  onSave,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [duracion, setDuracion] = useState(60);
  const [observaciones, setObservaciones] = useState("");

  async function guardar() {
    setSaving(true);

    try {
      const cita = await createAppointment({
        cliente,
        telefono,
        fecha,
        hora,
        trabajo,
        duracion,
        estado: "Pendiente",
        observaciones,
        repair_id: null,
      });

      onSave(cita);
    } catch (error) {
      console.error(error);
      alert("Error al guardar la cita.");
    }

    setSaving(false);
  }

  return (
    <div className="space-y-4">

      <input
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Trabajo a realizar"
        value={trabajo}
        onChange={(e) => setTrabajo(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <input
        type="number"
        value={duracion}
        onChange={(e) => setDuracion(Number(e.target.value))}
        className="w-full rounded-xl border p-3"
      />

      <textarea
        rows={4}
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <button
        onClick={guardar}
        disabled={saving}
        className="w-full rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar cita"}
      </button>

    </div>
  );
}