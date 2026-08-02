import type { Inventory } from "../../types/Inventory";
import {
  Package,
  Boxes,
  FlaskConical,
  Wrench,
} from "lucide-react";

type Props = {
  items: Inventory[];
};

export default function InventoryStats({ items }: Props) {
  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-gray-500">
              Total artículos
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {items.length}
            </h2>
          </div>

          <Package
            className="text-violet-600"
            size={42}
          />

        </div>
      </div>

      <div className="rounded-2xl bg-cyan-50 p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-cyan-700">
              Repuestos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-cyan-700">
              {
                items.filter(
                  (i) => i.categoria === "Repuesto"
                ).length
              }
            </h2>
          </div>

          <Boxes
            className="text-cyan-600"
            size={42}
          />

        </div>
      </div>

      <div className="rounded-2xl bg-yellow-50 p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-yellow-700">
              Consumibles
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-700">
              {
                items.filter(
                  (i) => i.categoria === "Consumible"
                ).length
              }
            </h2>
          </div>

          <FlaskConical
            className="text-yellow-600"
            size={42}
          />

        </div>
      </div>

      <div className="rounded-2xl bg-green-50 p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-green-700">
              Herramientas
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-700">
              {
                items.filter(
                  (i) => i.categoria === "Herramienta"
                ).length
              }
            </h2>
          </div>

          <Wrench
            className="text-green-600"
            size={42}
          />

        </div>
      </div>

    </div>
  );
}