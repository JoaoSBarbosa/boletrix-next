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

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ColumnTableProps } from "../tables/DefaultTable";
import { BgColor, ButtonRef, ButtonType } from "../buttons";
import { FilePdfIcon } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { drawHeader } from "./PdfHeader";
import { drawFooter } from "./PdfFooter";
import { showToastMessage } from "@/util/util";
import { DownloadingOrDeletingBox } from "../Loadings";

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
  const [isLoading, setIsLoading] = useState(false);

  function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
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
          textColor: [255, 255, 255], // branco no texto do cabeçalho
          fontStyle: "bold",
        },

        margin: { top: 45, bottom: 20 },
        didDrawPage: () => drawFooter(doc),
      });

      doc.save(filename);
    } catch (erro) {
      showToastMessage({
        type: "error",
        message: "Erro ao gerar o PDF: " + erro,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <ButtonRef
          title="Exportar PDF"
          width="max-content"
          value="Exportando..."
          disabled
          type={ButtonType.BUTTON}
          bgColor={BgColor.PRIMARY_SYSTEM}
        >
          <svg
            aria-hidden="true"
            className="w-[24px] h-[24px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </ButtonRef>
      ) : (
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
      )}
    </>
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
