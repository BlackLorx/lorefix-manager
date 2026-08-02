import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Correo o contraseña incorrectos");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 to-white">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold">
          LoreFix Manager
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Inicia sesión para continuar
        </p>

        <form
          onSubmit={login}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-4 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border p-4 outline-none focus:border-violet-500"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 p-4 font-semibold text-white transition hover:bg-violet-700"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

        </form>

      </div>

    </div>
  );
}