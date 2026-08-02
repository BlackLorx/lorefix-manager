import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import type { Repair } from "../types/Repair";

export async function generarPDF(repair: Repair) {
  const pdfDoc = await PDFDocument.create();

const seguimientoUrl = `https://lorefix-manager.vercel.app/seguimiento/${repair.codigo}`;

const qrDataUrl = await QRCode.toDataURL(seguimientoUrl);

const qrBytes = await fetch(qrDataUrl).then((r) => r.arrayBuffer());

const qrImage = await pdfDoc.embedPng(qrBytes);


  const page = pdfDoc.addPage([595, 842]);

const { height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Título
  page.drawText("LOREFIX", {
    x: 50,
    y: height - 60,
    size: 24,
    font: bold,
    color: rgb(0.45, 0.2, 0.8),
  });

  page.drawText("Resguardo de recepción", {
    x: 50,
    y: height - 90,
    size: 16,
    font: font,
  });

  let y = height - 140;

  function linea(titulo: string, valor: string) {
    page.drawText(`${titulo}:`, {
      x: 50,
      y,
      size: 12,
      font: bold,
    });

    page.drawText(valor || "-", {
      x: 180,
      y,
      size: 12,
      font,
    });

    y -= 28;
  }

  linea("Código", repair.codigo || "");
  linea("Cliente", repair.cliente);
  linea("Teléfono", repair.telefono);
  linea("Dispositivo", repair.dispositivo);
  linea("IMEI", repair.imei);
  linea("Estado", repair.estado);

  page.drawText("Avería:", {
    x: 50,
    y,
    size: 12,
    font: bold,
  });

  y -= 20;

  page.drawText(repair.averia || "-", {
    x: 50,
    y,
    size: 12,
    font,
    maxWidth: 500,
    lineHeight: 18,
  });

  y -= 80;

page.drawImage(qrImage, {
  x: 390,
  y: 70,
  width: 120,
  height: 120,
});

page.drawText("Escanea para consultar", {
  x: 365,
  y: 55,
  size: 10,
  font,
});

page.drawText("el estado de tu reparación", {
  x: 355,
  y: 42,
  size: 10,
  font,
});

page.drawText("Gracias por confiar en LoreFix.", {
  x: 50,
  y: 40,
  size: 11,
  font,
  color: rgb(0.4, 0.4, 0.4),
});
  return await pdfDoc.save();
}