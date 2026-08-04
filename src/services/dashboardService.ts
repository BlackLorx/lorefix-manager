import { supabase } from "../lib/supabase";

export async function getDashboardStats() {
  const { data, error } = await supabase
    .from("repairs")
    .select("price,payment_status");

  if (error) throw error;

  const repairs = data ?? [];

  const totalRepairs = repairs.length;

  const totalRevenue = repairs.reduce(
    (sum, repair) => sum + Number(repair.price ?? 0),
    0
  );

  const paidRevenue = repairs
    .filter((repair) => repair.payment_status === "Pagado")
    .reduce(
      (sum, repair) => sum + Number(repair.price ?? 0),
      0
    );

  const pendingRevenue = repairs
    .filter((repair) => repair.payment_status !== "Pagado")
    .reduce(
      (sum, repair) => sum + Number(repair.price ?? 0),
      0
    );

  const averageTicket =
    totalRepairs === 0
      ? 0
      : totalRevenue / totalRepairs;

  return {
    totalRepairs,
    totalRevenue,
    paidRevenue,
    pendingRevenue,
    averageTicket,
  };
}

export async function getLatestRepairs() {
  const { data, error } = await supabase
    .from("repairs")
    .select(`
      id,
      codigo,
      cliente,
      estado,
      price
    `)
    .order("id", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data ?? [];
}