import { useEffect, useMemo, useState } from "react";

import CustomerTable from "../../components/customers/CustomerTable";

import type { Customer } from "../../types/Customer";

import { getCustomers } from "../../services/customerService";

export default function Clientes() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  async function cargarClientes() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const text = search.toLowerCase();

      return (
        customer.cliente.toLowerCase().includes(text) ||
        customer.telefono.includes(text)
      );
    });
  }, [customers, search]);

  return (
    <div className="p-4 md:p-6 xl:p-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Clientes
          </h1>

          <p className="mt-2 text-gray-500">
            {filteredCustomers.length} clientes registrados
          </p>

        </div>

      </div>

      <input
        placeholder="Buscar cliente o teléfono..."
        className="mt-8 w-full rounded-xl border p-4 outline-none focus:border-violet-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-8">

        <CustomerTable
          customers={filteredCustomers}
        />

      </div>

    </div>
  );
}