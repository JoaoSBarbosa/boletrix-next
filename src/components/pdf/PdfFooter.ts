import { jsPDF } from "jspdf";

export const drawFooter = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    `Página ${(doc as any).internal.getNumberOfPages()}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  doc.text(
    "Gerado por Boletrix - BarbosaCode",
    pageWidth - 14,
    pageHeight - 10,
    { align: "right" }
  );
};
