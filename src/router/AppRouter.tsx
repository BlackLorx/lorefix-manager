import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { useState } from "react";

import Dashboard from "../pages/Dashboard/Dashboard";
import Recepciones from "../pages/Recepciones/Recepciones";
import Clientes from "../pages/Clientes/Clientes";
import ClienteDetalle from "../pages/Clientes/ClienteDetalle";
import Inventario from "../pages/Inventario/Inventario";
import Citas from "../pages/Citas/Citas";
import Ajustes from "../pages/Ajustes/Ajustes";
import Seguimiento from "../pages/Seguimiento/Seguimiento";
import Precios from "../pages/Precios/Precios";
import Login from "../pages/Login/Login";

import PrivateRoute from "../auth/PrivateRoute";

function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Header
          onMenu={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Página pública */}
        <Route path="/seguimiento" element={<Seguimiento />} />
        <Route path="/seguimiento/:codigo" element={<Seguimiento />} />

        {/* Área privada */}
        <Route
          element={
            <PrivateRoute>
              <PanelLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recepciones" element={<Recepciones />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route
            path="/clientes/:telefono"
            element={<ClienteDetalle />}
          />
          <Route path="/precios" element={<Precios />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}