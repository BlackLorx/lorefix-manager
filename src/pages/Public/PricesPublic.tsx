import { useEffect, useState } from "react";

import type { Price } from "../../types/Price";

import { getPublicPrices } from "../../services/priceService";


export default function PricesPublic() {

  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    cargarPrecios();

  }, []);



  async function cargarPrecios() {

    try {

      const data = await getPublicPrices();

      setPrices(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }



  if (loading) {

    return (
      <div className="p-10 text-center text-gray-500">
        Cargando precios...
      </div>
    );

  }



  const grupos = prices.reduce(
    (acc: any, item) => {

      const marca =
        item.brands?.name ?? "Otros";

      const dispositivo =
        item.devices?.name ?? "Dispositivo";


      if (!acc[marca]) {
        acc[marca] = {};
      }


      if (!acc[marca][dispositivo]) {
        acc[marca][dispositivo] = [];
      }


      acc[marca][dispositivo].push(item);


      return acc;

    },
    {}
  );



  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-10">


      <div className="mx-auto max-w-6xl">


        <header className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-violet-700">
            Lista de precios
          </h1>

          <p className="mt-3 text-gray-500">
            Servicios de reparación LOREFIX
          </p>

        </header>



        {Object.entries(grupos).map(
          ([marca, dispositivos]: any) => (

            <div
              key={marca}
              className="mb-10 rounded-3xl bg-white p-8 shadow-sm"
            >


              <h2 className="text-3xl font-bold text-violet-700">
                {marca}
              </h2>



              {Object.entries(dispositivos).map(
                ([modelo, servicios]: any) => (

                  <div
                    key={modelo}
                    className="mt-8"
                  >


                    <h3 className="mb-4 text-xl font-bold">
                      {modelo}
                    </h3>



                    <div className="overflow-hidden rounded-2xl border">


                      <table className="w-full">


                        <thead className="bg-gray-100">

                          <tr>

                            <th className="p-4 text-left">
                              Categoría
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


                          {servicios.map(
                            (item: Price) => (

                              <tr
                                key={item.id}
                                className="border-t"
                              >


                                <td className="p-4 text-gray-600">

                                  {item.category}

                                </td>


                                <td className="p-4 font-semibold">

                                  {item.service}

                                  {item.description && (

                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.description}
                                    </p>

                                  )}

                                </td>


                                <td className="p-4 text-right text-xl font-bold text-green-600">

                                  {Number(item.price).toFixed(2)} €

                                </td>


                              </tr>

                            )

                          )}


                        </tbody>


                      </table>


                    </div>


                  </div>

                )

              )}


            </div>

          )

        )}


      </div>


    </div>

  );

}