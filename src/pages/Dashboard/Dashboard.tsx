export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 xl:p-10">

      <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl">
        Dashboard
      </h1>

      <p className="mt-2 text-sm text-gray-500 md:text-base">
        Bienvenido a LOREFIX Manager
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:mt-10 xl:grid-cols-4 xl:gap-6">

        <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm text-gray-500 md:text-base">
            Reparaciones hoy
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            0
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm text-gray-500 md:text-base">
            Pendientes
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            0
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm text-gray-500 md:text-base">
            Clientes
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            0
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm text-gray-500 md:text-base">
            Facturación
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            0 €
          </h2>
        </div>

      </div>

    </div>
  );
}