import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCustomerByPhone } from "../../services/customerService";

export default function ClienteDetalle() {
    const { telefono } = useParams();

    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        cargarCliente();
    }, []);

    async function cargarCliente() {
        if (!telefono) return;

        try {
            const data = await getCustomerByPhone(
                decodeURIComponent(telefono)
            );

            setCustomer(data);
        } catch (error) {
            console.error(error);
        }
    }

    if (!customer) {
        return (
            <div className="p-10 text-center text-gray-500">
                Cargando cliente...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl p-8">

            <h1 className="text-4xl font-bold">
                {customer.cliente}
            </h1>

            <p className="mt-2 text-gray-500">
                📞 {customer.telefono}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total gastado
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-green-600">
                        {customer.total.toFixed(2)} €
                    </h2>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <p className="text-gray-500">
                        Pendiente de cobro
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-yellow-600">
                        {customer.pending.toFixed(2)} €
                    </h2>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <p className="text-gray-500">
                        Reparaciones
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-violet-600">
                        {customer.repairs.length}
                    </h2>
                </div>

            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-4 text-left">
                                Código
                            </th>

                            <th className="p-4 text-left">
                                Dispositivo
                            </th>

                            <th className="p-4 text-left">
                                Estado
                            </th>

                            <th className="p-4 text-right">
                                Precio
                            </th>
                            <th className="p-4 text-center">
                                Acciones
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {customer.repairs.map((repair: any) => (

                            <tr
                                key={repair.id}
                                className="border-t hover:bg-violet-50"
                            >

                                <td className="p-4 font-semibold text-violet-700">
                                    {repair.codigo}
                                </td>

                                <td className="p-4">
                                    {repair.dispositivo}
                                </td>

                                <td className="p-4">
                                    {repair.estado}
                                </td>

                                <td className="p-4 text-right font-semibold text-green-600">
                                    {Number(repair.price ?? 0).toFixed(2)} €
                                </td>
                                <td className="p-4">

                                    <div className="flex justify-center gap-2">

                                        {repair.pdf_url && (
                                            <a
                                                href={repair.pdf_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                                            >
                                                PDF
                                            </a>
                                        )}

                                        <Link
                                            to={`/recepciones?repair=${repair.id}`}
                                            className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
                                        >
                                            Abrir
                                        </Link>

                                    </div>

                                </td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}