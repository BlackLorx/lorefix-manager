import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import {
    Search,
    Smartphone,
    User,
    Wrench,
    ClipboardList,
} from "lucide-react";

type Repair = {
    id: number;
    codigo: string;
    cliente: string;
    dispositivo: string;
    averia: string;
    estado: string;
};

type RepairHistory = {
    id: number;
    estado: string;
    comentario: string | null;
    created_at: string;
};

export default function Seguimiento() {
    const { codigo: codigoUrl } = useParams();

    console.log("codigoUrl:", codigoUrl);

    const [codigo, setCodigo] = useState("");
    const [repair, setRepair] = useState<Repair | null>(null);
    const [history, setHistory] = useState<RepairHistory[]>([]);
    const [loading, setLoading] = useState(false);

    async function buscar(codigoBusqueda?: string) {
        const codigoFinal = (codigoBusqueda ?? codigo).toUpperCase();

        if (!codigoFinal) return;

        setLoading(true);

        console.log("Buscando:", codigoFinal);
        const { data, error } = await supabase
      .from("repairs")
            .select("*")
            .eq("codigo", codigoFinal)
            .single();

        console.log("Resultado:", data);
        console.log("Error:", error);

        setLoading(false);

        if (error || !data) {
            setRepair(null);

            if (!codigoBusqueda) {
                alert("Código no encontrado");
            }

            return;
        }

        setCodigo(codigoFinal);
        setRepair(data);

        const { data: historyData } = await supabase
            .from("repair_history")
            .select("*")
            .eq("repair_id", data.id)
            .order("created_at", { ascending: true });

        setHistory(historyData ?? []);
    }

    useEffect(() => {
        if (codigoUrl) {
            buscar(codigoUrl);
        }
    }, [codigoUrl]);
    function colorEstado(estado: string) {
        switch (estado) {
            case "Pendiente":
                return "bg-yellow-100 text-yellow-700";

            case "Recibido":
                return "bg-blue-100 text-blue-700";

            case "Diagnóstico":
                return "bg-orange-100 text-orange-700";

            case "Esperando piezas":
                return "bg-purple-100 text-purple-700";

            case "Reparando":
                return "bg-cyan-100 text-cyan-700";

            case "Terminado":
                return "bg-green-100 text-green-700";

            case "Entregado":
                return "bg-violet-100 text-violet-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    }

    function obtenerProgreso(estado: string) {
        const estados = [
            "Pendiente",
            "Recibido",
            "Diagnóstico",
            "Esperando piezas",
            "Reparando",
            "Terminado",
            "Entregado",
        ];

        return ((estados.indexOf(estado) + 1) / estados.length) * 100;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
            <div className="mx-auto max-w-2xl px-6 py-14">

                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-violet-700">
                        LoreFix
                    </h1>

                    <p className="mt-3 text-lg text-gray-600">
                        Consulta el estado de tu reparación
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-2xl">

                    <label className="mb-3 block text-sm font-semibold text-gray-600">
                        Código de reparación
                    </label>

                    <input
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                        placeholder="LF-000001"
                        className="mb-5 w-full rounded-2xl border p-4 text-lg outline-none transition focus:border-violet-500"
                    />

                    <button
                        onClick={() => buscar()}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white hover:bg-violet-700"
                    >
                        <Search size={20} />
                        {loading ? "Buscando..." : "Buscar reparación"}
                    </button>
                    {repair && (
                        <div className="mt-10 rounded-2xl border border-violet-100 bg-gray-50 p-7">

                            <div className="mb-8 text-center">
                                <p className="text-sm uppercase tracking-widest text-gray-500">
                                    Código
                                </p>

                                <h2 className="mt-2 text-4xl font-black text-violet-700">
                                    {repair.codigo}
                                </h2>

                                <div className="mt-8">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                                            Progreso
                                        </span>

                                        <span className="font-bold text-violet-700">
                                            {Math.round(obtenerProgreso(repair.estado))}%
                                        </span>
                                    </div>

                                    <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-violet-600 transition-all duration-700"
                                            style={{
                                                width: `${obtenerProgreso(repair.estado)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <div className="flex items-center gap-4">
                                    <User className="text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500">Cliente</p>
                                        <p className="font-semibold">{repair.cliente}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Smartphone className="text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500">Dispositivo</p>
                                        <p className="font-semibold">{repair.dispositivo}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Wrench className="text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500">Estado actual</p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-4 py-2 font-semibold ${colorEstado(
                                                repair.estado
                                            )}`}
                                        >
                                            {repair.estado}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <ClipboardList className="mt-1 text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500">Avería</p>

                                        <p className="whitespace-pre-line font-medium">
                                            {repair.averia}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-violet-100 bg-white p-5">

                                    <h3 className="mb-5 text-lg font-bold text-violet-700">
                                        Historial de la reparación
                                    </h3>

                                    <div className="space-y-4">

                                        {history.length === 0 ? (

                                            <p className="text-gray-500">
                                                Todavía no hay movimientos registrados.
                                            </p>

                                        ) : (

                                            history.map((item, index) => (

                                                <div
                                                    key={item.id}
                                                    className="relative flex gap-4"
                                                >

                                                    <div className="flex flex-col items-center">

                                                        <div className="h-4 w-4 rounded-full bg-violet-600" />

                                                        {index !== history.length - 1 && (
                                                            <div className="mt-1 h-12 w-1 bg-violet-200" />
                                                        )}

                                                    </div>

                                                    <div>

                                                        <p className="font-semibold">
                                                            {item.estado}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {new Date(item.created_at).toLocaleString("es-ES")}
                                                        </p>

                                                        {item.comentario && (
                                                            <p className="mt-1 text-sm text-gray-700">
                                                                {item.comentario}
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                            ))

                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Gracias por confiar en <strong>LoreFix</strong>.
                </p>

            </div>
        </div>
    );
}