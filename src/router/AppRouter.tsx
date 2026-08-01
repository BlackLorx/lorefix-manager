import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import Dashboard from "../pages/Dashboard/Dashboard";
import Recepciones from "../pages/Recepciones/Recepciones";
import Clientes from "../pages/Clientes/Clientes";
import Inventario from "../pages/Inventario/Inventario";
import Ajustes from "../pages/Ajustes/Ajustes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-col flex-1">
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
    </BrowserRouter>
  );
}