import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import Dashboard from "../pages/Dashboard/Dashboard";
import Recepciones from "../pages/Recepciones/Recepciones";
import Clientes from "../pages/Clientes/Clientes";
import Inventario from "../pages/Inventario/Inventario";
import Ajustes from "../pages/Ajustes/Ajustes";
import Seguimiento from "../pages/Seguimiento/Seguimiento";

function Panel() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recepciones" element={<Recepciones />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/ajustes" element={<Ajustes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública */}
        <Route path="/seguimiento" element={<Seguimiento />} />

        {/* Panel privado (por ahora sin protección) */}
        <Route path="/*" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
}