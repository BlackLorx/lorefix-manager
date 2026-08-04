import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { useAuth } from "../../auth/Auth";

import type { Price } from "../../types/Price";

import {
    getPrices,
    deletePrice,
} from "../../services/priceService";

import PriceTable from "../../components/tables/PriceTable";
import PriceForm from "../../components/forms/PriceForm";
import Modal from "../../components/ui/Modal";

export default function Precios() {
    const { role } = useAuth();

    const [prices, setPrices] = useState<Price[]>([]);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [editingPrice, setEditingPrice] =
        useState<Price | null>(null);

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

    async function guardarServicio() {

        try {

            await cargarPrecios();

            setEditingPrice(null);
            setOpen(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function eliminarServicio(id: number) {
        const confirmar = window.confirm(
            "¿Eliminar este servicio?"
        );

        if (!confirmar) return;

        try {
            await deletePrice(id);

            setPrices((prev) =>
                prev.filter((p) => p.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    }

    function editarServicio(price: Price) {
        setEditingPrice(price);
        setOpen(true);
    }

    const filtered = prices.filter((item) => {
        const texto = search.toLowerCase();

        return (
            item.brands?.name?.toLowerCase().includes(texto) ||
            item.devices?.name?.toLowerCase().includes(texto) ||
            item.category?.toLowerCase().includes(texto) ||
            item.service?.toLowerCase().includes(texto)
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

                <div className="flex gap-3">

                    <a
                        href="/precios"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50"
                    >
                        🌐 Ver página pública
                    </a>


                    {role === "admin" && (

                        <button
                            onClick={() => {
                                setEditingPrice(null);
                                setOpen(true);
                            }}
                            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
                        >
                            + Nuevo servicio
                        </button>

                    )}

                </div>

            </div>

            <div className="relative mt-8">

                <Search
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Buscar marca, dispositivo, categoría o servicio..."
                    className="w-full rounded-xl border bg-white py-3 pl-12 pr-4"
                />

            </div>

            <div className="mt-8">

                <PriceTable
                    prices={filtered}
                    onEdit={editarServicio}
                    onDelete={eliminarServicio}
                />

            </div>

            <Modal
                open={open}
                title={
                    editingPrice
                        ? "Editar servicio"
                        : "Nuevo servicio"
                }
                onClose={() => {
                    setOpen(false);
                    setEditingPrice(null);
                }}
            >
                <PriceForm
                    editingPrice={editingPrice}
                    onSave={guardarServicio}
                />
            </Modal>

        </div>
    );
}