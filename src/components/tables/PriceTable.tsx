import type { Price } from "../../types/Price";
import { useAuth } from "../../auth/Auth";

type Props = {
  prices: Price[];
  onEdit: (price: Price) => void;
  onDelete: (id: number) => void;
};

export default function PriceTable({
  prices,
  onEdit,
  onDelete,
}: Props) {

  const { role } = useAuth();


  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Marca
            </th>

            <th className="p-4 text-left">
              Dispositivo
            </th>

            <th className="p-4 text-left">
              Categoría
            </th>

            <th className="p-4 text-left">
              Servicio
            </th>

            <th className="p-4 text-right">
              Precio
            </th>

            <th className="p-4 text-center">
              Público
            </th>


            {role === "admin" && (

              <th className="p-4 text-center">
                Acciones
              </th>

            )}

          </tr>

        </thead>


        <tbody>


          {prices.length === 0 ? (

            <tr>

              <td
                colSpan={
                  role === "admin"
                    ? 7
                    : 6
                }
                className="p-10 text-center text-gray-500"
              >
                No hay servicios registrados.
              </td>

            </tr>


          ) : (


            prices.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-violet-50"
              >


                <td className="p-4 font-semibold">

                  {item.brands?.name ?? "-"}

                </td>


                <td className="p-4">

                  {item.devices?.name ?? "-"}

                </td>


                <td className="p-4">

                  {item.category}

                </td>


                <td className="p-4">

                  {item.service}

                </td>


                <td className="p-4 text-right font-bold text-green-600">

                  {Number(item.price).toFixed(2)} €

                </td>


                <td className="p-4 text-center">

                  {item.public
                    ? "✅"
                    : "❌"}

                </td>



                {role === "admin" && (

                  <td className="p-4">

                    <div className="flex justify-center gap-2">


                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
                      >
                        Editar
                      </button>


                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Eliminar
                      </button>


                    </div>

                  </td>

                )}


              </tr>

            ))

          )}


        </tbody>

      </table>

    </div>
  );
}