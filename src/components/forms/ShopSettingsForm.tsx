import { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
  type Settings,
} from "../../services/settingsService";

export default function ShopSettingsForm() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<Settings>({
    id: 1,
    shop_name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    tax_id: "",
    logo: null,
  });

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const data = await getSettings();
      setSettings(data);
    } finally {
      setLoading(false);
    }
  }

  async function guardar() {
    try {
      await updateSettings(settings);
      alert("Configuración guardada correctamente.");
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar.");
    }
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="space-y-5">

      <input
        placeholder="Nombre del taller"
        value={settings.shop_name}
        onChange={(e) =>
          setSettings({
            ...settings,
            shop_name: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Dirección"
        value={settings.address}
        onChange={(e) =>
          setSettings({
            ...settings,
            address: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Teléfono"
        value={settings.phone}
        onChange={(e) =>
          setSettings({
            ...settings,
            phone: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Email"
        value={settings.email}
        onChange={(e) =>
          setSettings({
            ...settings,
            email: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="Página web"
        value={settings.website}
        onChange={(e) =>
          setSettings({
            ...settings,
            website: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        placeholder="CIF / NIF"
        value={settings.tax_id}
        onChange={(e) =>
          setSettings({
            ...settings,
            tax_id: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <button
        onClick={guardar}
        className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
      >
        Guardar cambios
      </button>

    </div>
  );
}