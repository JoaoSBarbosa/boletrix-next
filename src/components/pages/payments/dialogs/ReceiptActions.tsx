// import {DownloadSimpleIcon, EyeIcon, HandTapIcon} from "@phosphor-icons/react";
// import {InstallmentResponseType} from "@/types/InstallmentResponseType";
//
// interface ReceiptActionsProps {
//     onDownload: () => void;
//     onDisplay?: () => void;
//     row: InstallmentResponseType
// }
//
// export const ReceiptActions = ({onDisplay, onDownload,row}: ReceiptActionsProps) => {
//     return (
//         <div className={"inline-flex items-center gap-3"}>
//             <DownloadSimpleIcon size={32} className="cursor-pointer" onClick={onDownload}/>
//
//             {row?.receiptUrl ? (
//                 <a
//                     href={row.receiptUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title="Abrir arquivo no Dropbox em uma nova aba"
//                     className="inline-flex items-center justify-center"
//                 >
//                     <EyeIcon
//                         size={32}
//                         color="#6361f5"
//                         weight="fill"
//                         className="hover:fill-sky-600 cursor-pointer"
//                     />
//                 </a>
//             ) : (
//                 <span>Não possui link</span>
//             )}
//
//         </div>
//     )
// }

import { DownloadSimpleIcon, EyeIcon } from "@phosphor-icons/react";
import { InstallmentResponseType } from "@/types/InstallmentResponseType";

interface ReceiptActionsProps {
    onDownload: () => void;
    onDisplay?: () => void;
    row: InstallmentResponseType;
}

export const ReceiptActions = ({ onDisplay, onDownload, row }: ReceiptActionsProps) => {
    const hasReceiptUrl = !!row?.receiptUrl;

    return (
        <div className="inline-flex items-center gap-4">
            <button
                onClick={onDownload}
                title="Baixar comprovante"
                className="hover:bg-green-600 transition-colors bg-green-100 p-1 rounded-md"
            >
                <DownloadSimpleIcon size={28} color={"#15803d"} className={"hover:fill-white"}/>
            </button>

            {hasReceiptUrl ? (
                <a
                    href={row.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Visualizar comprovante"
                    className="hover:bg-blue-600 transition-colors bg-blue-100 p-1 rounded-md"
                >
                    <EyeIcon size={28} color={"#60a5fa"} className={"hover:fill-white"}/>
                </a>
            ) : (
                <span className="text-sm text-gray-400 italic">Sem link</span>
            )}
        </div>
    );
};
