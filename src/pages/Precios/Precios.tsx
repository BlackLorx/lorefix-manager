import { useEffect, useState } from "react";

import { Search, BadgeEuro } from "lucide-react";

import type { Price } from "../../types/Price";
import { getPrices } from "../../services/priceService";

export default function Precios() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarPrecios();
  }, []);

  async function cargarPrecios() {
    try {
      const data = await getPrices();
      setPrices(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = prices.filter((item) => {
    const texto = search.toLowerCase();

    return (
      item.brand.toLowerCase().includes(texto) ||
      item.device.toLowerCase().includes(texto) ||
      item.service.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="p-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Lista de precios
          </h1>

          <p className="mt-2 text-gray-500">
            Gestiona todos los servicios del taller.
          </p>

        </div>

        <button
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          + Nuevo servicio
        </button>

      </div>

      <div className="relative mt-8">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar marca, dispositivo o reparación..."
          className="w-full rounded-xl border bg-white py-3 pl-12 pr-4"
        />

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">

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
                Servicio
              </th>

              <th className="p-4 text-right">
                Precio
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="p-12 text-center text-gray-500"
                >
                  No hay servicios registrados.
                </td>

              </tr>

            ) : (

              filtered.map((item) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-violet-50"
                >

                  <td className="p-4 font-semibold">
                    {item.brand}
                  </td>

                  <td className="p-4">
                    {item.device}
                  </td>

                  <td className="p-4">
                    {item.service}
                  </td>

                  <td className="p-4 text-right font-bold text-green-600">

                    <div className="flex items-center justify-end gap-2">

                      <BadgeEuro
                        size={18}
                      />

                      {item.price.toFixed(2)} €

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}