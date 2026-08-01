export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Bienvenido a LOREFIX Manager
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-gray-500">Reparaciones hoy</p>
          <h2 className="text-5xl font-bold mt-3">0</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-gray-500">Pendientes</p>
          <h2 className="text-5xl font-bold mt-3">0</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-gray-500">Clientes</p>
          <h2 className="text-5xl font-bold mt-3">0</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-gray-500">Facturación</p>
          <h2 className="text-5xl font-bold mt-3">0 €</h2>
        </div>

      </div>
    </div>
  );
}