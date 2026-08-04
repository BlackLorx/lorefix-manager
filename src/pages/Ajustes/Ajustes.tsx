import { useState } from "react";

import { useAuth } from "../../auth/Auth";
import { supabase } from "../../lib/supabase";

import Modal from "../../components/ui/Modal";
import ThemeToggle from "../../components/ui/ThemeToggle";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import ShopSettingsForm from "../../components/forms/ShopSettingsForm";


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

  return (
    <div className="mx-auto max-w-5xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Ajustes
      </h1>

      {/* Cuenta */}

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

              <p>{session?.user.email}</p>

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
              className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
            >
              Cambiar contraseña
            </button>

            <button
              onClick={cerrarSesion}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>

          </div>

        </div>

      </div>

      {/* Apariencia */}

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

      {/* Taller */}

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Taller
        </h2>

        <ShopSettingsForm />

      </div>

      {/* Usuarios */}

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Usuarios
        </h2>

        <p className="text-gray-500">
          Gestión de administradores y usuarios con permisos de solo lectura.
        </p>

      </div>

      {/* Sistema */}

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