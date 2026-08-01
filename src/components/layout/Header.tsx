import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      <div className="flex items-center gap-3">

        <Search size={18} />

        <input
          placeholder="Buscar cliente, IMEI o reparación..."
          className="outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell size={20} />

        <div className="flex items-center gap-2">

          <UserCircle size={34} />

          <div>

            <p className="font-semibold">
              Lorenzo
            </p>

            <p className="text-sm text-gray-500">
              Técnico
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}