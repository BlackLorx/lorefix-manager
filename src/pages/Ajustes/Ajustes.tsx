import { useState } from "react";

import { useAuth } from "../../auth/Auth";
import { supabase } from "../../lib/supabase";

import Modal from "../../components/ui/Modal";
import ThemeToggle from "../../components/ui/ThemeToggle";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import ShopSettingsForm from "../../components/forms/ShopSettingsForm";

import { importCatalog } from "../../services/catalogImporter";
import { importServiceCatalog } from "../../services/importServiceCatalog";
import { generatePriceCatalog } from "../../services/generatePriceCatalog";

import {
  UserCircle,
  Mail,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Ajustes() {

  const { session, role } = useAuth();

  const [openPassword, setOpenPassword] = useState(false);

  async function cerrarSesion() {
    await supabase.auth.signOut();
  }

  async function importarCatalogo() {

    const confirmar = window.confirm(
      "Se importarán todas las marcas y dispositivos base. ¿Continuar?"
    );

    if (!confirmar) return;

    try {

      await importCatalog();

      alert("Catálogo importado correctamente.");

    } catch (error) {

      console.error(error);

      alert("Error al importar el catálogo.");

    }

  }

  async function importarServicios() {

    const confirmar = window.confirm(
      "Se crearán todos los servicios base para todas las marcas y dispositivos. ¿Continuar?"
    );

    if (!confirmar) return;

    try {

      await importServiceCatalog();

      alert("Servicios importados correctamente.");

    } catch (error) {

      console.error(error);

      alert("Error al importar los servicios.");

    }

  }
  async function generarPrecios() {

    const confirmar = window.confirm(
      "Se generarán automáticamente todos los precios base. ¿Continuar?"
    );

    if (!confirmar) return;

    try {

      await generatePriceCatalog();

      alert("Precios generados correctamente.");

    } catch (error) {

      console.error(error);

      alert("Error al generar los precios.");

    }

  }
  return (

    <div className="mx-auto max-w-5xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Ajustes
      </h1>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Cuenta
        </h2>

        <div className="space-y-6">

          <div className="flex items-center gap-4">

            <UserCircle
              size={48}
              className="text-violet-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Usuario
              </p>

              <p className="font-semibold">
                {session?.user.email}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Mail
              size={24}
              className="text-violet-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p>
                {session?.user.email}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <ShieldCheck
              size={24}
              className="text-violet-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Rol
              </p>

              <p className="font-semibold capitalize">
                {role}
              </p>

            </div>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setOpenPassword(true)}
              className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50"
            >
              Cambiar contraseña
            </button>

            <button
              onClick={cerrarSesion}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              <LogOut size={18} />

              Cerrar sesión

            </button>

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Apariencia
        </h2>

        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold">
              Tema
            </p>

            <p className="text-gray-500">
              Cambia entre modo claro y oscuro.
            </p>

          </div>

          <ThemeToggle />

        </div>

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Taller
        </h2>

        <ShopSettingsForm />

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Usuarios
        </h2>

        <p className="text-gray-500">
          Gestión de administradores y usuarios con permisos de solo lectura.
        </p>

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Sistema
        </h2>

        <div className="space-y-2">

          <p>
            <strong>Versión:</strong> 1.0.0
          </p>

          <p>
            <strong>Base de datos:</strong> Supabase
          </p>

          <p>
            <strong>Framework:</strong> React + Vite
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-2 text-2xl font-bold">
          Catálogo
        </h2>

        <p className="mb-6 text-gray-500">
          Importa automáticamente las marcas, dispositivos y servicios base.
        </p>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={importarCatalogo}
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            ⚡ Importar catálogo
          </button>

          <button
            onClick={importarServicios}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            📦 Importar servicios
          </button>
          <button
            onClick={generarPrecios}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            💰 Generar precios base
          </button>
        </div>

      </div>

      <Modal
        open={openPassword}
        title="Cambiar contraseña"
        onClose={() => setOpenPassword(false)}
      >
        <ChangePasswordForm
          onClose={() => setOpenPassword(false)}
        />
      </Modal>

    </div>

  );

}