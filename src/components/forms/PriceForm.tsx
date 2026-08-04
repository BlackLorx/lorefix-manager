import { useEffect, useState } from "react";

import type { Price } from "../../types/Price";
import type { Brand } from "../../types/Brand";
import type { Device } from "../../types/Device";

import {
  createPrice,
  updatePrice,
} from "../../services/priceService";

import { getBrands } from "../../services/brandService";
import { getDevices } from "../../services/deviceService";
import { getServiceCatalog } from "../../services/serviceCatalogService";

type ServiceItem = {
  id: number;
  category: string;
  name: string;
  default_price: number;
};

type Props = {
  onSave: (price: Price) => void;
  editingPrice?: Price | null;
};



export default function PriceForm({
  onSave,
  editingPrice,
}: Props) {


  const [brands, setBrands] = useState<Brand[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);


  const [selectedBrand, setSelectedBrand] =
    useState<number>(
      editingPrice?.brand_id ?? 0
    );


  const [selectedDevice, setSelectedDevice] =
    useState<number>(
      editingPrice?.device_id ?? 0
    );


  const [category, setCategory] =
    useState(
      editingPrice?.category ?? "Pantallas"
    );


  const [service, setService] =
    useState(
      editingPrice?.service ?? ""
    );


  const [price, setPrice] =
    useState(
      editingPrice?.price ?? 0
    );


  const [description, setDescription] =
    useState(
      editingPrice?.description ?? ""
    );


  const [isPublic, setIsPublic] =
    useState(
      editingPrice?.public ?? true
    );


  const [active, setActive] =
    useState(
      editingPrice?.active ?? true
    );


  const [saving, setSaving] =
    useState(false);



  useEffect(() => {

    cargarMarcas();
    cargarServicios();

  }, []);

  async function cargarServicios() {

    try {

      const data = await getServiceCatalog();

      setServices(data as ServiceItem[]);

    } catch (error) {

      console.error(error);

    }

  }

  async function cargarMarcas() {

    try {

      const data = await getBrands();

      setBrands(data);


      if (
        data.length > 0 &&
        selectedBrand === 0
      ) {

        setSelectedBrand(data[0].id);

        cargarDispositivos(data[0].id);

      }


    } catch (error) {

      console.error(
        error
      );

    }

  }



  async function cargarDispositivos(
    brandId: number
  ) {

    try {

      const data = await getDevices(
        brandId
      );


      setDevices(data);


      if (data.length > 0) {

        setSelectedDevice(
          data[0].id
        );

      } else {

        setSelectedDevice(0);

      }


    } catch (error) {

      console.error(
        error
      );

    }

  }



  async function cambiarMarca(
    brandId: number
  ) {

    setSelectedBrand(
      brandId
    );

    await cargarDispositivos(
      brandId
    );

  }
  async function guardar() {

    if (
      !selectedBrand ||
      !selectedDevice ||
      !service
    ) {

      alert(
        "Selecciona marca, dispositivo y servicio."
      );

      return;

    }

    const brand = brands.find(
      (b) => b.id === selectedBrand
    );

    const device = devices.find(
      (d) => d.id === selectedDevice
    );

    setSaving(true);


    try {


      if (editingPrice) {

        const actualizado: Price = {
          ...editingPrice,

          brand_id: selectedBrand,
          device_id: selectedDevice,

          brand: brand?.name ?? "",
          device: device?.name ?? "",

          category,
          service,
          price,
          description,
          public: isPublic,
          active,
        };


        await updatePrice(
          actualizado
        );


        onSave(
          actualizado
        );


      } else {


        const nuevo = await createPrice({

          brand_id: selectedBrand,
          device_id: selectedDevice,

          brand: brand?.name ?? "",
          device: device?.name ?? "",

          category,
          service,
          price,
          description,
          public: isPublic,
          active,

        } as Price);

        onSave(
          nuevo
        );

      }


    } catch (error) {

      console.error(
        error
      );

      alert(
        "Error guardando el servicio."
      );

    }


    setSaving(false);

  }



  return (
    <div className="space-y-4">


      <select
        className="w-full rounded-xl border p-3"
        value={selectedBrand}
        onChange={(e) =>
          cambiarMarca(
            Number(e.target.value)
          )
        }
      >

        {brands.map((brand) => (

          <option
            key={brand.id}
            value={brand.id}
          >

            {brand.name}

          </option>

        ))}

      </select>



      <select
        className="w-full rounded-xl border p-3"
        value={selectedDevice}
        onChange={(e) =>
          setSelectedDevice(
            Number(e.target.value)
          )
        }
      >

        {devices.map((device) => (

          <option
            key={device.id}
            value={device.id}
          >

            {device.name}

          </option>

        ))}

      </select>







      <select
        className="w-full rounded-xl border p-3"
        value={service}
        onChange={(e) => {

          const selected = services.find(
            (s) => s.name === e.target.value
          );

          setService(e.target.value);

          if (selected) {

            setCategory(selected.category);

            setPrice(selected.default_price);

          }

        }}
      >

        <option value="">
          Selecciona un servicio
        </option>

        {services.map((item) => (

          <option
            key={item.id}
            value={item.name}
          >
            {item.category} · {item.name}
          </option>

        ))}

      </select>



      <input
        type="number"
        placeholder="Precio (€)"
        className="w-full rounded-xl border p-3"
        value={price}
        onChange={(e) =>
          setPrice(
            Number(e.target.value)
          )
        }
      />



      <textarea
        rows={4}
        placeholder="Descripción"
        className="w-full rounded-xl border p-3"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />



      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) =>
            setIsPublic(
              e.target.checked
            )
          }
        />

        Visible públicamente

      </label>



      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={active}
          onChange={(e) =>
            setActive(
              e.target.checked
            )
          }
        />

        Servicio activo

      </label>



      <button
        onClick={guardar}
        disabled={saving}
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
      >

        {saving
          ? "Guardando..."
          : editingPrice
            ? "Guardar cambios"
            : "Crear servicio"}

      </button>


    </div>
  );
}