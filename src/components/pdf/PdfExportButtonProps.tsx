// import React from "react";
// import { ColumnTableProps } from "../tables/DefaultTable";
// import { FileDown, FunnelIcon } from "lucide-react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { BgColor, ButtonRef, ButtonType } from "../buttons";
// import { FilePdfIcon } from "@phosphor-icons/react";

// interface PdfExportButtonProps<T = any> {
//   title?: string;
//   columns: ColumnTableProps<T>[];
//   list: T[];
//   filename?: string;
// }
// export const PdfExportButton = <T,>({
//   columns,
//   list,
//   title = "Relatório",
//   filename = "relatorio.pdf",
// }: PdfExportButtonProps<T>) => {
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text(title, 14, 20);

//     autoTable(doc, {
//       startY: 30,
//       head: [
//         columns.map((col) =>
//           typeof col.name === "string" ? col.name : String(col.selector)
//         ),
//       ],
//       body: list.map((row) =>
//         columns.map((col) => {
//           const raw = col.cell ? col.cell(row) : (row as any)[col.selector];
//           return typeof raw === "string" || typeof raw === "number"
//             ? raw
//             : String(raw); // Evita erro se for ReactNode
//         })
//       ),
//       styles: { halign: "center" },
//       headStyles: { fillColor: [22, 160, 133] },
//     });

//     doc.save(filename);
//   };

//   return (
//     <ButtonRef
//     title="Exportar PDF"
//       onClick={handleDownloadPDF}
//       width="max-content"
//       value=""
//       type={ButtonType.BUTTON}
//         bgColor={BgColor.PRIMARY_SYSTEM}
//       >
//       <FilePdfIcon size={24} weight="fill"/>
//     </ButtonRef>
//   );
// };


import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ColumnTableProps } from "../tables/DefaultTable";
import { BgColor, ButtonRef, ButtonType } from "../buttons";
import { FilePdfIcon } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { drawHeader } from "./PdfHeader";
import { drawFooter } from "./PdfFooter";

interface PdfExportButtonProps<T = any> {
  title?: string;
  columns: ColumnTableProps<T>[];
  list: T[];
  filename?: string;
}

export const PdfExportButton = <T,>({
  columns,
  list,
  title = "Relatório de Pagamentos",
  filename = "relatorio.pdf",
}: PdfExportButtonProps<T>) => {
  const { user } = useAuth();

  function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString("pt-BR");
    const userName = user?.name || "Desconhecido";
    const imgData = await getBase64ImageFromURL("/img/boletrix_logo_5.png");

    drawHeader(doc, title, imgData, currentDate, userName);

    autoTable(doc, {
      startY: 40,
      head: [
        columns.map((col) =>
          typeof col.name === "string" ? col.name : String(col.selector)
        ),
      ],
      body: list.map((row) =>
        columns.map((col) => {
          const raw = col.cell ? col.cell(row) : (row as any)[col.selector];
          return typeof raw === "string" || typeof raw === "number"
            ? raw
            : String(raw);
        })
      ),
      styles: { halign: "center" },
      // headStyles: { fillColor: [22, 160, 133] },
      headStyles: {
  fillColor: hexToRgb("#00384D"), // azul escuro para o header
  textColor: [255, 255, 255],     // branco no texto do cabeçalho
  fontStyle: 'bold',
},

      margin: { top: 45, bottom: 20 },
      didDrawPage: () => drawFooter(doc),
    });

    doc.save(filename);
  };

  return (
    <ButtonRef
      title="Exportar PDF"
      onClick={handleDownloadPDF}
      width="max-content"
      value=""
      type={ButtonType.BUTTON}
      bgColor={BgColor.PRIMARY_SYSTEM}
    >
      <FilePdfIcon size={24} weight="fill" />
    </ButtonRef>
  );
};

// 🔁 Função utilitária (pode ir para um arquivo separado se quiser)
const getBase64ImageFromURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context error");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject("Erro ao carregar imagem");
    img.src = url;
  });
};
