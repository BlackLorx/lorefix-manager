import {
  LayoutDashboard,
  Smartphone,
  Users,
  Package,
  CalendarDays,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
  { icon: Smartphone, name: "Recepciones", path: "/recepciones" },
  { icon: CalendarDays, name: "Citas", path: "/citas" },
  { icon: Users, name: "Clientes", path: "/clientes" },
  { icon: Package, name: "Inventario", path: "/inventario" },
  { icon: Settings, name: "Ajustes", path: "/ajustes" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón móvil */}

      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-violet-600 p-2 text-white shadow-lg md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Fondo oscuro */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-gray-200 bg-white
          transition-transform duration-300

          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }

          md:static
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between border-b p-8">

          <div>
            <h1 className="text-3xl font-bold text-violet-700">
              LOREFIX
            </h1>

            <p className="mt-1 text-gray-500">
              Repair Manager
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <X size={22} />
          </button>

        </div>

        <nav className="mt-6">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mx-4 mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition ${isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-100"
                  }`
                }
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </aside>

    </>
  );
}