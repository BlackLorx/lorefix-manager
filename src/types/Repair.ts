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

  payment_method:
    | "Efectivo"
    | "Tarjeta"
    | "Bizum"
    | "Transferencia";

  paid_at?: string | null;

  pdf_url?: string;
}