import { useNavigate } from "react-router-dom";
import type { Customer } from "../../types/Customer";

type Props = {
  customers: Customer[];
};

export default function CustomerTable({
  customers,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-4 text-left">
              Cliente
            </th>

            <th className="p-4 text-left">
              Teléfono
            </th>

            <th className="p-4 text-center">
              Reparaciones
            </th>

            <th className="p-4 text-right">
              Gastado
            </th>
          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                className="p-8 text-center text-gray-500"
              >
                No hay clientes registrados.
              </td>

            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer.telefono}
                onClick={() =>
                  navigate(`/clientes/${encodeURIComponent(customer.telefono)}`)
                }
                className="cursor-pointer border-t transition hover:bg-violet-50"
              >

                <td className="p-4 font-semibold">
                  {customer.cliente}
                </td>

                <td className="p-4">
                  {customer.telefono}
                </td>

                <td className="p-4 text-center">
                  {customer.repairs}
                </td>

                <td className="p-4 text-right font-semibold text-green-600">
                  {customer.total.toFixed(2)} €
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}