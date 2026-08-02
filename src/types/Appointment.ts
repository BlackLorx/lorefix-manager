export type Appointment = {
  id: number;

  cliente: string;
  telefono: string;

  fecha: string;
  hora: string;

  trabajo: string;

  duracion: number;

  estado:
    | "Pendiente"
    | "Confirmada"
    | "Finalizada"
    | "Cancelada";

  observaciones: string;

  repair_id: number | null;

  created_at?: string;
};