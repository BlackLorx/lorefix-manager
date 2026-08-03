import type { Appointment } from "../../types/Appointment";
import { useAuth } from "../../auth/Auth";

type Props = {
  appointments: Appointment[];
  onOpen: (appointment: Appointment) => void;
};

const estadoStyles: Record<string, string> = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Confirmada: "bg-blue-100 text-blue-800",
  Finalizada: "bg-green-100 text-green-800",
  Cancelada: "bg-red-100 text-red-800",
};

export default function AppointmentTable({
  appointments,
  onOpen,
}: Props) {
  const { role } = useAuth();

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Fecha</th>
            <th className="p-4 text-left">Hora</th>
            <th className="p-4 text-left">Cliente</th>
            <th className="p-4 text-left">Trabajo</th>
            <th className="p-4 text-left">Estado</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-gray-500"
              >
                No hay citas registradas.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="p-4">
                  {appointment.fecha}
                </td>

                <td className="p-4">
                  {appointment.hora}
                </td>

                <td className="p-4 font-medium">
                  {appointment.cliente}
                </td>

                <td className="p-4">
                  {appointment.trabajo}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${estadoStyles[appointment.estado]
                      }`}
                  >
                    {appointment.estado}
                  </span>
                </td>

                <td className="p-4 text-center">
                  {role === "admin" && (
                    <button
                      onClick={() => onOpen(appointment)}
                      className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700"
                    >
                      Abrir
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}