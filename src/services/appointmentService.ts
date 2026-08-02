import { supabase } from "../lib/supabase";
import type { Appointment } from "../types/Appointment";

export async function getAppointments() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) throw error;

  return data as Appointment[];
}

export async function createAppointment(
  appointment: Omit<Appointment, "id">
) {
  const { data, error } = await supabase
    .from("appointments")
    .insert(appointment)
    .select()
    .single();

  if (error) throw error;

  return data as Appointment;
}

export async function updateAppointment(
  appointment: Appointment
) {
  const { error } = await supabase
    .from("appointments")
    .update({
      cliente: appointment.cliente,
      telefono: appointment.telefono,
      fecha: appointment.fecha,
      hora: appointment.hora,
      trabajo: appointment.trabajo,
      duracion: appointment.duracion,
      estado: appointment.estado,
      observaciones: appointment.observaciones,
      repair_id: appointment.repair_id,
    })
    .eq("id", appointment.id);

  if (error) throw error;
}

export async function deleteAppointment(id: number) {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) throw error;
}