import { useState } from "react";
import type { Appointment } from "../../types/Appointment";

import {
    updateAppointment,
    deleteAppointment,
} from "../../services/appointmentService";

type Props = {
    appointment: Appointment;
    onSave: (appointment: Appointment) => void;
    onDelete: (id: number) => void;
};

export default function EditAppointmentForm({
    appointment,
    onSave,
    onDelete,
}: Props) {
    const [data, setData] = useState(appointment);
    const [saving, setSaving] = useState(false);

    function update<K extends keyof Appointment>(
        key: K,
        value: Appointment[K]
    ) {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    async function guardarCambios() {
        setSaving(true);

        try {
            await updateAppointment(data);
            onSave(data);
        } catch (error) {
            console.error(error);
            alert("Error al guardar la cita.");
        }

        setSaving(false);
    }

    async function eliminarCita() {
        const confirmar = window.confirm(
            "¿Seguro que quieres eliminar esta cita?"
        );

        if (!confirmar) return;

        setSaving(true);

        try {
            await deleteAppointment(data.id);
            onDelete(data.id);
        } catch (error) {
            console.error(error);
            alert("Error al eliminar la cita.");
        }

        setSaving(false);
    }

    return (
        <div className="space-y-4">

            <input
                className="w-full rounded-xl border p-3"
                value={data.cliente}
                onChange={(e) =>
                    update("cliente", e.target.value)
                }
            />

            <input
                className="w-full rounded-xl border p-3"
                value={data.telefono}
                onChange={(e) =>
                    update("telefono", e.target.value)
                }
            />

            <input
                type="date"
                className="w-full rounded-xl border p-3"
                value={data.fecha}
                onChange={(e) =>
                    update("fecha", e.target.value)
                }
            />

            <input
                type="time"
                className="w-full rounded-xl border p-3"
                value={data.hora}
                onChange={(e) =>
                    update("hora", e.target.value)
                }
            />
            <input
                className="w-full rounded-xl border p-3"
                value={data.trabajo}
                onChange={(e) =>
                    update("trabajo", e.target.value)
                }
            />

            <input
                type="number"
                className="w-full rounded-xl border p-3"
                value={data.duracion}
                onChange={(e) =>
                    update("duracion", Number(e.target.value))
                }
            />

            <select
                className="w-full rounded-xl border p-3"
                value={data.estado}
                onChange={(e) =>
                    update(
                        "estado",
                        e.target.value as Appointment["estado"]
                    )
                }
            >
                <option>Pendiente</option>
                <option>Confirmada</option>
                <option>Finalizada</option>
                <option>Cancelada</option>
            </select>

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
                    className="flex-1 rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700 disabled:opacity-50"
                >
                    {saving
                        ? "Guardando..."
                        : "Guardar cambios"}
                </button>

                <button
                    onClick={eliminarCita}
                    disabled={saving}
                    className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
                >
                    Eliminar
                </button>

            </div>

        </div>
    );
}