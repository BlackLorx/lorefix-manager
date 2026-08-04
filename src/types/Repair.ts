export interface Repair {
  id: number;

  codigo?: string;

  cliente: string;
  telefono: string;

  dispositivo: string;
  marca: string;
  modelo: string;

  imei: string;
  averia: string;

  estado: string;

  price: number;

  payment_status:
    | "Pendiente"
    | "Pagado"
    | "Parcial";

  pdf_url?: string;
}