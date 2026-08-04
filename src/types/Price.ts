export interface Price {
  id: number;


  // Compatibilidad antigua
  brand?: string;
  device?: string;


  // Nueva estructura
  brand_id: number;
  device_id: number;


  category: string;

  service: string;


  price: number;


  description: string;


  public: boolean;

  active: boolean;


  // Datos obtenidos mediante JOIN
  brands?: {
    id: number;
    name: string;
  };


  devices?: {
    id: number;
    name: string;
  };
}