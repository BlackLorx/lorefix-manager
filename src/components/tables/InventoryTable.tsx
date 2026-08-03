import type { Inventory } from "../../types/Inventory";
import InventoryActions from "../inventory/InventoryActions";
import { useAuth } from "../../auth/Auth";

type Props = {
  items: Inventory[];
  onOpen: (item: Inventory) => void;
  onIncrease: (item: Inventory) => void;
  onDecrease: (item: Inventory) => void;
};

export default function InventoryTable({
  items,
  onOpen,
  onIncrease,
  onDecrease,
}: Props) {
  const { role } = useAuth();

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Categoría</th>
            <th className="p-4 text-left">Marca</th>
            <th className="p-4 text-left">Ubicación</th>
            <th className="p-4 text-center">Stock</th>
            <th className="p-4 text-center">Mínimo</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {items.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-8 text-center text-gray-500"
              >
                No hay artículos registrados.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {item.nombre}
                </td>

                <td className="p-4">
                  {item.categoria}
                </td>

                <td className="p-4">
                  {item.marca || "-"}
                </td>

                <td className="p-4">
                  {item.ubicacion || "-"}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${item.stock === 0
                      ? "bg-red-600 text-white"
                      : item.stock <= item.stock_minimo
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {item.stock}
                  </span>

                </td>

                <td className="p-4 text-center">
                  {item.stock_minimo}
                </td>

                <td className="p-4">
                  {role === "admin" && (
                    <InventoryActions
                      item={item}
                      onEdit={onOpen}
                      onIncrease={onIncrease}
                      onDecrease={onDecrease}
                    />
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