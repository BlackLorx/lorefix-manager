import { supabase } from "../lib/supabase";
import { generarPDF } from "../utils/pdf";
import type { Repair } from "../types/Repair";

export async function generarResguardo(repair: Repair) {
  const pdfBytes = await generarPDF(repair);

  // Convertimos el Uint8Array en un ArrayBuffer "limpio"
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;

  const blob = new Blob([arrayBuffer], {
    type: "application/pdf",
  });

  const fileName = `${repair.codigo}.pdf`;

  const { error } = await supabase.storage
    .from("pdfs")
    .upload(fileName, blob, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("pdfs")
    .getPublicUrl(fileName);

  return data.publicUrl;
}