import type { Repair } from "../../types/Repair";

type Props = {
  repairs: Repair[];
  onOpen: (repair: Repair) => void;
};

const estadoStyles: Record<string, string> = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Recibido: "bg-blue-100 text-blue-800",
  Diagnóstico: "bg-purple-100 text-purple-800",
  "Esperando piezas": "bg-orange-100 text-orange-800",
  Reparando: "bg-cyan-100 text-cyan-800",
  Terminado: "bg-green-100 text-green-800",
  Entregado: "bg-gray-800 text-white",
};

export default function RepairTable({ repairs, onOpen }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Nº</th>
            <th className="p-4 text-left">Cliente</th>
            <th className="p-4 text-left">Dispositivo</th>
            <th className="p-4 text-left">Estado</th>
            <th className="p-4 text-left">IMEI</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {repairs.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-gray-500">
                No hay reparaciones registradas.
              </td>
            </tr>
          ) : (
            repairs.map((repair, index) => (
              <tr
                key={repair.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{index + 1}</td>

                <td className="p-4 font-medium">
                  {repair.cliente}
                </td>

                <td className="p-4">
                  {repair.dispositivo}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      estadoStyles[repair.estado] ??
                      "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {repair.estado}
                  </span>
                </td>

                <td className="p-4 font-mono text-sm">
                  {repair.imei}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onOpen(repair)}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-700"
                  >
                    Abrir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}