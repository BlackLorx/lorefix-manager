import { useEffect, useState } from "react";
import type { Repair } from "../../types/Repair";

import { supabase } from "../../lib/supabase";

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Recepciones
          </h1>

          <p className="mt-2 text-gray-500">
            Gestiona todas las reparaciones del taller.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          + Nueva recepción
        </Button>
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
        onOpen={abrirReparacion}
      />

      <Modal
        open={open}
        title="Nueva recepción"
        onClose={() => setOpen(false)}
      >
        <ReceptionForm onSave={guardarReparacion} />
      </Modal>

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
    </div>
  );
}