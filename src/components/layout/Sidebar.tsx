import {
  LayoutDashboard,
  Smartphone,
  Users,
  Package,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", path: "/" },
  { icon: Smartphone, name: "Recepciones", path: "/recepciones" },
  { icon: Users, name: "Clientes", path: "/clientes" },
  { icon: Package, name: "Inventario", path: "/inventario" },
  { icon: Settings, name: "Ajustes", path: "/ajustes" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200">
      <div className="p-8 border-b">
        <h1 className="text-3xl font-bold text-violet-700">
          LOREFIX Prueba
        </h1>

        <p className="text-gray-500 mt-1">
          Repair Manager
        </p>
      </div>

      <nav className="mt-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mx-4 mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
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
  );
}