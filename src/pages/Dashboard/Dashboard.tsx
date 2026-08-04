import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getLatestRepairs,
} from "../../services/dashboardService";

type LatestRepair = {
  id: number;
  codigo: string;
  cliente: string;
  estado: string;
  price: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRepairs: 0,
    totalRevenue: 0,
    paidRevenue: 0,
    pendingRevenue: 0,
    averageTicket: 0,
  });

  const [latestRepairs, setLatestRepairs] = useState<LatestRepair[]>([]);

  useEffect(() => {
    cargarDashboard();
  }, []);

  async function cargarDashboard() {
    try {
      const statsData = await getDashboardStats();
      const latestData = await getLatestRepairs();

      setStats(statsData);
      setLatestRepairs(latestData as LatestRepair[]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-4 md:p-6 xl:p-10">

      <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl">
        Dashboard
      </h1>

      <p className="mt-2 text-sm text-gray-500 md:text-base">
        Bienvenido a LOREFIX Manager
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Reparaciones
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {stats.totalRepairs}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Pendiente de cobro
          </p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-600">
            {stats.pendingRevenue.toFixed(2)} €
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Cobrado
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {stats.paidRevenue.toFixed(2)} €
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Facturación
          </p>

          <h2 className="mt-3 text-4xl font-bold text-violet-600">
            {stats.totalRevenue.toFixed(2)} €
          </h2>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

        <p className="text-gray-500">
          Ticket medio
        </p>

        <h2 className="mt-3 text-4xl font-bold text-cyan-600">
          {stats.averageTicket.toFixed(2)} €
        </h2>

      </div>

      <div className="mt-8 rounded-2xl border bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">
            Últimas reparaciones
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">
                Código
              </th>

              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

              <th className="p-4 text-right">
                Precio
              </th>
            </tr>

          </thead>

          <tbody>

            {latestRepairs.map((repair) => (

              <tr
                key={repair.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {repair.codigo}
                </td>

                <td className="p-4">
                  {repair.cliente}
                </td>

                <td className="p-4">
                  {repair.estado}
                </td>

                <td className="p-4 text-right font-semibold text-green-600">
                  {Number(repair.price).toFixed(2)} €
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}