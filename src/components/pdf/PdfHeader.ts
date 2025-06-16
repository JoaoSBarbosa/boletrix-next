import { jsPDF } from "jspdf";

export const drawHeader = (
  doc: jsPDF,
  title: string,
  imgData: string,
  date: string,
  userName: string
) => {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.addImage(imgData, "PNG", 14, 8, 12, 12); // menor logo
  doc.setFontSize(12);
  doc.text(title, pageWidth / 2, 15, { align: "center" });

  doc.setFontSize(8);
  doc.text(`Emitido em: ${date}`, pageWidth - 14, 10, { align: "right" });
  doc.text(`Exportado por: ${userName}`, pageWidth - 14, 15, { align: "right" });
};
