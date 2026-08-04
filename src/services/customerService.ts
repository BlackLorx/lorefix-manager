import { supabase } from "../lib/supabase";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("repairs")
    .select("*")
    .order("cliente");

  if (error) throw error;

  const map = new Map();

  for (const repair of data ?? []) {
    const key = repair.telefono || repair.cliente;

    if (!map.has(key)) {
      map.set(key, {
        cliente: repair.cliente,
        telefono: repair.telefono,
        repairs: 1,
        total: Number(repair.price ?? 0),
        lastRepair: repair.created_at,
      });
    } else {
      const c = map.get(key);

      c.repairs++;
      c.total += Number(repair.price ?? 0);

      if (repair.created_at > c.lastRepair) {
        c.lastRepair = repair.created_at;
      }
    }
  }

  return [...map.values()];
}

export async function getCustomerByPhone(
  telefono: string
) {
  const { data, error } = await supabase
    .from("repairs")
    .select("*")
    .eq("telefono", telefono)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  if (!data || data.length === 0) {
    return null;
  }

  const total = data.reduce(
    (sum, repair) => sum + Number(repair.price ?? 0),
    0
  );

  const pending = data
    .filter(
      (repair) =>
        repair.payment_status !== "Pagado"
    )
    .reduce(
      (sum, repair) => sum + Number(repair.price ?? 0),
      0
    );

  return {
    cliente: data[0].cliente,
    telefono: data[0].telefono,
    total,
    pending,
    repairs: data,
  };
}