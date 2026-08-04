import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Repair } from "../../types/Repair";


import { supabase } from "../../lib/supabase";
import { useAuth } from "../../auth/Auth";

import Button from "../../components/ui/Button";
import RepairTable from "../../components/tables/RepairTable";
import Modal from "../../components/ui/Modal";
import ReceptionForm from "../../components/forms/ReceptionForm";
import EditRepairForm from "../../components/forms/EditRepairForm";

import {
  ClipboardList,
  Clock3,
  Wrench,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";

export default function Recepciones() {
  const { role } = useAuth();

  const [searchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarReparaciones();
  }, []);

  async function cargarReparaciones() {
    const { data, error } = await supabase
      .from("repairs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRepairs(data as Repair[]);
    const repairId = Number(searchParams.get("repair"));

    if (repairId) {
      const repair = (data as Repair[]).find(
        (r) => r.id === repairId
      );

      if (repair) {
        setSelectedRepair(repair);
      }
    }
  }

  function guardarReparacion(repair: Repair) {
    setRepairs((prev) => [repair, ...prev]);
    setOpen(false);
  }

  function abrirReparacion(repair: Repair) {
    setSelectedRepair(repair);
  }

  function actualizarReparacion(repairActualizada: Repair) {
    setRepairs((prev) =>
      prev.map((repair) =>
        repair.id === repairActualizada.id
          ? repairActualizada
          : repair
      )
    );

    setSelectedRepair(null);
  }

  function eliminarReparacion(id: number) {
    setRepairs((prev) =>
      prev.filter((repair) => repair.id !== id)
    );

    setSelectedRepair(null);
  }

  const repairsFiltradas = repairs.filter((repair) => {
    const texto = search.toLowerCase();

    return (
      repair.cliente.toLowerCase().includes(texto) ||
      repair.telefono.toLowerCase().includes(texto) ||
      repair.imei.toLowerCase().includes(texto) ||
      repair.dispositivo.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="p-10">
      <div className="mb-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl">
              Recepciones
            </h1>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Gestiona todas las reparaciones del taller.
            </p>

          </div>

          {role === "admin" && (
            <Button
              onClick={() => setOpen(true)}
              className="w-full md:w-auto"
            >
              + Nueva recepción
            </Button>
          )}

        </div>

      </div>

      {/* Tarjetas resumen */}
      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {repairs.length}
              </h2>
            </div>

            <ClipboardList
              size={42}
              className="text-violet-600"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">
                Pendientes
              </p>

              <h2 className="mt-2 text-4xl font-bold text-yellow-700">
                {repairs.filter((r) => r.estado === "Pendiente").length}
              </h2>
            </div>

            <Clock3
              size={42}
              className="text-yellow-600"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-cyan-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-700">
                Reparando
              </p>

              <h2 className="mt-2 text-4xl font-bold text-cyan-700">
                {repairs.filter((r) => r.estado === "Reparando").length}
              </h2>
            </div>

            <Wrench
              size={42}
              className="text-cyan-600"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-green-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">
                Terminadas
              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-700">
                {repairs.filter((r) => r.estado === "Terminado").length}
              </h2>
            </div>

            <CheckCircle2
              size={42}
              className="text-green-600"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-violet-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-violet-700">
                Entregadas
              </p>

              <h2 className="mt-2 text-4xl font-bold text-violet-700">
                {repairs.filter((r) => r.estado === "Entregado").length}
              </h2>
            </div>

            <PackageCheck
              size={42}
              className="text-violet-600"
            />
          </div>
        </div>

      </div>

      <input
        placeholder="Buscar por cliente, teléfono, IMEI..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border p-4 outline-none focus:border-violet-500"
      />

      <RepairTable
        repairs={repairsFiltradas}
        onOpen={
          role === "admin"
            ? abrirReparacion
            : () => { }
        }
      />

      <Modal
        open={open}
        title="Nueva recepción"
        onClose={() => setOpen(false)}
      >
        <ReceptionForm onSave={guardarReparacion} />
      </Modal>

      {role === "admin" && (
        <Modal
          open={selectedRepair !== null}
          title="Ficha de reparación"
          onClose={() => setSelectedRepair(null)}
        >
          {selectedRepair && (
            <EditRepairForm
              repair={selectedRepair}
              onSave={actualizarReparacion}
              onDelete={eliminarReparacion}
            />
          )}
        </Modal>
      )}
    </div>
  );
}