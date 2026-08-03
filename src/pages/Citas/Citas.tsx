import { useEffect, useState } from "react";
import type { Appointment } from "../../types/Appointment";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import AppointmentForm from "../../components/forms/AppointmentForm";
import AppointmentTable from "../../components/tables/AppointmentTable";
import EditAppointmentForm from "../../components/forms/EditAppointmentForm";

import { getAppointments } from "../../services/appointmentService";
import { useAuth } from "../../auth/Auth";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export default function Citas() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null);
    const { role } = useAuth();


    useEffect(() => {
        cargarCitas();
    }, []);

    async function cargarCitas() {
        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error(error);
        }
    }

    function guardarCita(cita: Appointment) {
        setAppointments((prev) => [...prev, cita]);
        setOpen(false);
    }

    function abrirCita(cita: Appointment) {
        setSelectedAppointment(cita);
    }

    function actualizarCita(citaActualizada: Appointment) {
        setAppointments((prev) =>
            prev.map((cita) =>
                cita.id === citaActualizada.id
                    ? citaActualizada
                    : cita
            )
        );

        setSelectedAppointment(null);
    }

    function eliminarCita(id: number) {
        setAppointments((prev) =>
            prev.filter((cita) => cita.id !== id)
        );

        setSelectedAppointment(null);
    }


    const citasFiltradas = appointments.filter((appointment) => {
        const texto = search.toLowerCase();

        return (
            appointment.cliente.toLowerCase().includes(texto) ||
            appointment.telefono.toLowerCase().includes(texto) ||
            appointment.trabajo.toLowerCase().includes(texto)
        );
    });

    return (
        <div className="p-10">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        Citas
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Gestiona las citas del taller.
                    </p>
                </div>

                {role === "admin" && (
                    <Button onClick={() => setOpen(true)}>
                        + Nueva cita
                    </Button>
                )}

            </div>

            {/* Tarjetas */}

            <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500">
                                Total citas
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">
                                {appointments.length}
                            </h2>
                        </div>

                        <CalendarDays
                            className="text-violet-600"
                            size={42}
                        />

                    </div>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-yellow-700">
                                Pendientes
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-yellow-700">
                                {
                                    appointments.filter(
                                        (a) => a.estado === "Pendiente"
                                    ).length
                                }
                            </h2>

                        </div>

                        <Clock3
                            className="text-yellow-600"
                            size={42}
                        />

                    </div>

                </div>

                <div className="rounded-2xl bg-green-50 p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-green-700">
                                Finalizadas
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-green-700">
                                {
                                    appointments.filter(
                                        (a) => a.estado === "Finalizada"
                                    ).length
                                }
                            </h2>

                        </div>

                        <CheckCircle2
                            className="text-green-600"
                            size={42}
                        />

                    </div>

                </div>

                <div className="rounded-2xl bg-red-50 p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-red-700">
                                Canceladas
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-red-700">
                                {
                                    appointments.filter(
                                        (a) => a.estado === "Cancelada"
                                    ).length
                                }
                            </h2>

                        </div>

                        <XCircle
                            className="text-red-600"
                            size={42}
                        />

                    </div>

                </div>

            </div>

            <input
                placeholder="Buscar cita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full rounded-xl border p-4 outline-none focus:border-violet-500"
            />

            <AppointmentTable
                appointments={citasFiltradas}
                onOpen={role === "admin" ? abrirCita : () => { }}
            />

            <Modal
                open={open}
                title="Nueva cita"
                onClose={() => setOpen(false)}
            >
                <AppointmentForm
                    onSave={guardarCita}
                />
            </Modal>

            {role === "admin" && (
                <Modal
                    open={selectedAppointment !== null}
                    title="Editar cita"
                    onClose={() => setSelectedAppointment(null)}
                >
                    {selectedAppointment && (
                        <EditAppointmentForm
                            appointment={selectedAppointment}
                            onSave={actualizarCita}
                            onDelete={eliminarCita}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
}
