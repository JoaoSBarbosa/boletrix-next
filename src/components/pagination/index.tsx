// import {useWindowSize} from "@/hooks/useWindowSize";
// import {SkipBackIcon, SkipForwardIcon} from "@phosphor-icons/react";
//
// type PaginationProps = {
//     currentPage: number;
//     totalPages: number;
//     totalElements: number;
//     pageSize: number;
//     onPageChange: (page: number) => void;
// };
//
// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalElements, pageSize, onPageChange }) => {
//     const { height } = useWindowSize();
//     const isSmallScreen = height <= 768;
//
//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };
//
//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };
//
//     const handleFirstPage = () => {
//         if (currentPage !== 1) {
//             onPageChange(1);
//         }
//     };
//
//     const handleLastPage = () => {
//         if (currentPage !== totalPages) {
//             onPageChange(totalPages);
//         }
//     };
//
//     // Correção na exibição do intervalo de registros
//     const startItem = (currentPage - 1) * pageSize + 1;
//     const endItem = Math.min(currentPage * pageSize, totalElements);
//     const showFullText = `Mostrando ${startItem}-${endItem} de ${totalElements} registros`;
//
//     return (
//         <div className={`text-[13px] flex flex-wrap items-center justify-center gap-4 ${isSmallScreen ? "py-1" : "py-2"} rounded-md px-4`}>
//
//             {/* Exibição da quantidade de registros */}
//             {totalElements > 0 && (
//                 <span className="text-gray-600 text-sm">{showFullText}</span>
//             )}
//
//             {/* Botão para a primeira página */}
//             <button
//                 className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleFirstPage}
//                 disabled={currentPage === 1}
//             >
//                 {/*{"|<"} Primeira*/}
//                 <SkipBackIcon weight={"fill"}/> Primeira
//             </button>
//
//             {/* Botão para a página anterior */}
//             <button
//                 className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handlePrevious}
//                 disabled={currentPage === 1}
//             >
//                 {"<"} Anterior
//             </button>
//
//             {/* Exibe a página atual e total */}
//             <span className="text-gray-700 font-medium">
//                 Página {currentPage} de {totalPages}
//             </span>
//
//             {/* Botão para a próxima página */}
//             <button
//                 className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//             >
//                 Próxima {">"}
//             </button>
//
//             {/* Botão para a última página */}
//             <button
//                 className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleLastPage}
//                 disabled={currentPage === totalPages}
//             >
//                 {/*Última {">|"}*/}
//                 Última <SkipForwardIcon weight={"fill"}/>
//             </button>
//         </div>
//     );
// };
//
// export default Pagination;
//

import { useWindowSize } from "@/hooks/useWindowSize";
import { SkipBackIcon, SkipForwardIcon } from "@phosphor-icons/react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   totalElements,
                                                   pageSize,
                                                   onPageChange,
                                               }) => {
    const { width } = useWindowSize();
    const isSmallScreen = width <= 640;

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handleFirstPage = () => {
        if (currentPage !== 1) onPageChange(1);
    };

    const handleLastPage = () => {
        if (currentPage !== totalPages) onPageChange(totalPages);
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalElements);
    const showFullText = `Mostrando ${startItem}-${endItem} de ${totalElements} registros`;

    return (
        // <div className="w-full flex flex-col items-center gap-2 py-2 px-4 text-sm border border-red-500">
        <div className="w-full max-w-full flex flex-col items-center gap-2 py-2 text-sm overflow-x-auto">
            {/* Texto de registros */}
            {totalElements > 0 && (
                <span className="text-gray-600 text-center">{showFullText}</span>
            )}

            {/* Controles de paginação */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                    className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                >
                    <SkipBackIcon weight="fill" size={16} />
                    {!isSmallScreen && "Primeira"}
                </button>

                <button
                    className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    {"<"} {!isSmallScreen && "Anterior"}
                </button>

                <span className="text-gray-700 font-medium px-2">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    {!isSmallScreen && "Próxima"} {">"}
                </button>

                <button
                    className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                >
                    {!isSmallScreen && "Última"}
                    <SkipForwardIcon weight="fill" size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;


// import {useWindowSize} from "@/hooks/useWindowSize";
// import {SkipBackIcon, SkipForwardIcon} from "@phosphor-icons/react";
//
// type PaginationProps = {
//     currentPage: number;
//     totalPages: number;
//     totalElements: number;
//     pageSize: number;
//     onPageChange: (page: number) => void;
// };
//
// const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, totalElements, pageSize, onPageChange}) => {
//     const {height} = useWindowSize();
//     const isSmallScreen = height <= 768;
//
//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };
//
//     const handleNext = () => {
//         console.log("CLUICOU EM HANDLE NEXT")
//         console.log("CURRENT PAGE" + currentPage)
//         console.log("TOTAL PAGES" + totalPages)
//         if (currentPage < totalPages) {
//             console.log("CAIU NO IF")
//             onPageChange(currentPage + 1);
//         }
//     };
//
//     const handleFirstPage = () => {
//         if (currentPage !== 1) {
//             onPageChange(1);
//         }
//     };
//
//     const handleLastPage = () => {
//         if (currentPage !== totalPages) {
//             onPageChange(totalPages);
//         }
//     };
//
//     // Correção na exibição do intervalo de registros
//     const startItem = (currentPage - 1) * pageSize + 1;
//     const endItem = Math.min(currentPage * pageSize, totalElements);
//     const showFullText = `Mostrando ${startItem}-${endItem} de ${totalElements} registros`;
//
//     return (
//         <div
//             className={`text-[13px] flex flex-wrap items-center justify-center gap-4 ${isSmallScreen ? "py-1" : "py-2"} rounded-md px-4`}>
//
//             {/* Exibição da quantidade de registros */}
//             {totalElements > 0 && (
//                 <span className="text-gray-600 text-sm">{showFullText}</span>
//             )}
//
//             {/* Botão para a primeira página */}
//             <button
//                 className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleFirstPage}
//                 disabled={currentPage === 1}
//             >
//                 {/*{"|<"} Primeira*/}
//                 <SkipBackIcon weight={"fill"}/> Primeira
//             </button>
//
//             {/* Botão para a página anterior */}
//             <button
//                 className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handlePrevious}
//                 disabled={currentPage === 1}
//             >
//                 {"<"} Anterior
//             </button>
//
//             {/* Exibe a página atual e total */}
//             <span className="text-gray-700 font-medium">
//                 Página {currentPage} de {totalPages}
//             </span>
//
//             {/* Botão para a próxima página */}
//             <button
//                 className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//             >
//                 Próxima {">"}
//             </button>
//
//             {/* Botão para a última página */}
//             <button
//                 className="flex items-center gap-1 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleLastPage}
//                 disabled={currentPage === totalPages}
//             >
//                 {/*Última {">|"}*/}
//                 Última <SkipForwardIcon weight={"fill"}/>
//             </button>
//         </div>
//     );
// };
//
// export default Pagination;

