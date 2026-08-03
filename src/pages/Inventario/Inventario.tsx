import { useAuth } from "../../auth/Auth";
import { useEffect, useState } from "react";
import type { Inventory } from "../../types/Inventory";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import InventoryForm from "../../components/forms/InventoryForm";
import EditInventoryForm from "../../components/forms/EditInventoryForm";

import InventoryTable from "../../components/tables/InventoryTable";

import InventoryStats from "../../components/inventory/InventoryStats";
import InventorySearch from "../../components/inventory/InventorySearch";

import {
  getInventory,
  increaseStock,
  decreaseStock,
} from "../../services/inventoryService";

export default function Inventario() {
  const [items, setItems] = useState<Inventory[]>([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedItem, setSelectedItem] =
    useState<Inventory | null>(null);
  const { role } = useAuth();

  useEffect(() => {
    cargarInventario();
  }, []);

  async function cargarInventario() {
    try {
      const data = await getInventory();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  function guardarArticulo(item: Inventory) {
    setItems((prev) => [...prev, item]);
    setOpen(false);
  }

  function abrirArticulo(item: Inventory) {
    setSelectedItem(item);
  }

  function actualizarArticulo(itemActualizado: Inventory) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemActualizado.id
          ? itemActualizado
          : item
      )
    );

    setSelectedItem(null);
  }

  function eliminarArticulo(id: number) {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setSelectedItem(null);
  }

  async function sumarStock(item: Inventory) {
    try {
      const actualizado = await increaseStock(item);

      setItems((prev) =>
        prev.map((i) =>
          i.id === actualizado.id ? actualizado : i
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function restarStock(item: Inventory) {
    try {
      const actualizado = await decreaseStock(item);

      setItems((prev) =>
        prev.map((i) =>
          i.id === actualizado.id ? actualizado : i
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  const itemsFiltrados = items.filter((item) => {
    const texto = search.toLowerCase();

    return (
      item.nombre.toLowerCase().includes(texto) ||
      item.categoria.toLowerCase().includes(texto) ||
      item.marca.toLowerCase().includes(texto) ||
      item.proveedor.toLowerCase().includes(texto)
    );
  });

  return (<div className="p-10">

    <div className="mb-8 flex items-center justify-between">

      <div>
        <h1 className="text-4xl font-bold">
          Inventario
        </h1>

        <p className="mt-2 text-gray-500">
          Gestiona el almacén del taller.
        </p>
      </div>

      {role === "admin" && (
        <Button onClick={() => setOpen(true)}>
          + Nuevo artículo
        </Button>
      )}

    </div>

    <InventoryStats items={items} />

    <InventorySearch
      value={search}
      onChange={setSearch}
    />

    <InventoryTable
      items={itemsFiltrados}
      onOpen={role === "admin" ? abrirArticulo : () => { }}
      onIncrease={role === "admin" ? sumarStock : async () => { }}
      onDecrease={role === "admin" ? restarStock : async () => { }}
    />

    <Modal
      open={open}
      title="Nuevo artículo"
      onClose={() => setOpen(false)}
    >
      <InventoryForm
        onSave={guardarArticulo}
      />
    </Modal>

    {role === "admin" && (
      <Modal
        open={selectedItem !== null}
        title="Editar artículo"
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <EditInventoryForm
            item={selectedItem}
            onSave={actualizarArticulo}
            onDelete={eliminarArticulo}
          />
        )}
      </Modal>
    )}

  </div>
  );
}