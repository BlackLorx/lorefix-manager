import {
  Bell,
  Search,
  UserCircle,
  Menu,
} from "lucide-react";

type Props = {
  onMenu: () => void;
};

export default function Header({ onMenu }: Props) {
  return (
    <header className="border-b border-gray-200 bg-white">

      {/* Escritorio */}

      <div className="hidden h-16 items-center justify-between px-8 md:flex">

        <div className="flex items-center gap-3">

          <Search size={18} />

          <input
            placeholder="Buscar cliente, IMEI o reparación..."
            className="w-96 outline-none"
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

      </div>

      {/* Móvil */}

      <div className="flex flex-col gap-4 p-4 md:hidden">

<div className="flex items-center justify-between">

  <button
    onClick={onMenu}
    className="rounded-xl p-3 transition hover:bg-gray-100"
  >
    <Menu size={26} />
  </button>

  <div className="flex items-center gap-4">

    <Bell size={22} />

    <UserCircle size={30} />

  </div>

</div>

<h1 className="text-2xl font-bold text-violet-700">
  LOREFIX
</h1>

<div className="flex items-center gap-3 rounded-2xl border px-4 py-3">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            placeholder="Buscar..."
            className="w-full outline-none"
          />

        </div>

      </div>

    </header>
  );
}