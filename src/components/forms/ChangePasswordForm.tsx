import { useState } from "react";
import { supabase } from "../../lib/supabase";

type Props = {
  onClose: () => void;
};

export default function ChangePasswordForm({
  onClose,
}: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function cambiarPassword() {
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Contraseña actualizada correctamente.");

    onClose();
  }

  return (
    <div className="space-y-5">

      <div>
        <label className="mb-2 block font-medium">
          Nueva contraseña
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border p-3 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Confirmar contraseña
        </label>

        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-xl border p-3 outline-none focus:border-violet-500"
        />
      </div>

      <button
        onClick={cambiarPassword}
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Actualizando..." : "Guardar contraseña"}
      </button>

    </div>
  );
}