import {
    SkipForwardIcon,
    SkipBackIcon,
    RewindCircleIcon,
    ArchiveIcon,
    ListIcon,
    RewindIcon
} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import styles from "./PageableFooter.module.css";
import {useWindowSize} from "@/hooks/useWindowSize";

interface PageableFooterProps {
    page: number;
    itemPerPage: number;
    quantityItemsList: number;
    totalItems: number;
    hasNextPage: boolean;
    onNextPage: (nextPage: number) => void;
    onBackPage: (nextPage: number) => void;
    border?: boolean;
}

export function PageableFooter(
    {
        page,
        itemPerPage,
        quantityItemsList,
        totalItems,
        border,
        hasNextPage,
        onNextPage,
        onBackPage
    }: PageableFooterProps) {

    const [maxPage, setMaxPage] = useState<number>(0);

    const {width} = useWindowSize();
    const isSmallScreen = width <= 640;

    useEffect(() => {
        setMaxPage(Math.ceil(totalItems / itemPerPage));
    }, [itemPerPage]);


    return (
        <div className={`${styles.root} ${border ? "border border-gray-200" : ""}`}>
            <div className={styles.totalItemsRoot}>
                <div className={styles.infoIconContainer}>
                    <ListIcon
                        size={'60%'}
                        weight="bold"
                    />
                </div>

                Total: {totalItems > 0 && totalItems}
                <strong>{totalItems === 0 ? 'Nenhum item' : totalItems === 1 ? ' Item' : ' Itens'}</strong>
            </div>

            <div className={styles.navigationButtonsContent}>
                {
                    page !== 1 &&
                    <button
                        onClick={() => onBackPage(1)}
                        className={styles.navigationButton}
                    >
                        <div className={styles.infoIconContainer}>
                            <RewindIcon
                                size={'50%'}
                                weight="fill"
                            />
                        </div>

                        {!isSmallScreen &&
                            "Primeira"
                        }
                    </button>
                }

                <button
                    disabled={page === 1}
                    onClick={() => onBackPage(page - 1)}
                    className={styles.navigationButton}
                >
                    <div className={styles.infoIconContainer}>
                        <SkipBackIcon
                            size={'50%'}
                            weight="fill"
                        />
                    </div>

                    {!isSmallScreen &&

                        "Anterior"
                    }
                </button>

                Atual: <strong>{page}</strong> de <strong>{maxPage}</strong>

                {
                    hasNextPage &&
                    <>
                        <button
                            onClick={() => onNextPage(page + 1)}
                            className={styles.navigationButton}
                        >

                            {!isSmallScreen &&
                                "Próximo"
                            }

                            <div className={styles.infoIconContainer}>
                                <SkipForwardIcon
                                    size={'50%'}
                                    weight="fill"
                                />
                            </div>
                        </button>

                        <button
                            onClick={() => onNextPage(maxPage)}
                            className={styles.navigationButton}
                        >
                            {!isSmallScreen &&
                                "Ultima"
                            }


                            <div className={styles.infoIconContainer}>
                                <RewindCircleIcon
                                    size={'50%'}
                                    weight="fill"
                                    style={{
                                        rotate: '180deg'
                                    }}
                                />
                            </div>
                        </button>
                    </>
                }
            </div>

            <div className={styles.listSizeContent}>
                <div className={styles.infoIconContainer}>
                    <ArchiveIcon
                        size={'60%'}
                        weight="bold"
                        color={quantityItemsList === 0 ? '#dc2626' : '#15803d'}
                    />
                </div>

                Qtd. lista: <strong
                style={{color: quantityItemsList === 0 ? '#dc2626' : '#15803d'}}>{quantityItemsList > 0 && quantityItemsList} {quantityItemsList === 0 ? 'Nunhum' : quantityItemsList === 1 ? ' Item' : ' Itens'}</strong>
            </div>
        </div>
    );
}

//
// import {
//     SkipForwardIcon,
//     SkipBackIcon,
//     RewindIcon,
//     RewindCircleIcon,
//     ListIcon,
//     ArchiveIcon
// } from "@phosphor-icons/react";
// import { useEffect, useState } from "react";
// import styles from "./PageableFooter.module.css";
//
// interface PageableFooterProps {
//     page: number;
//     itemPerPage: number;
//     quantityItemsList: number;
//     totalItems: number;
//     hasNextPage: boolean;
//     onNextPage: (nextPage: number) => void;
//     onBackPage: (nextPage: number) => void;
// }
//
// export function PageableFooter({
//                                    page,
//                                    itemPerPage,
//                                    quantityItemsList,
//                                    totalItems,
//                                    hasNextPage,
//                                    onNextPage,
//                                    onBackPage
//                                }: PageableFooterProps) {
//     const [maxPage, setMaxPage] = useState(Math.ceil(totalItems / itemPerPage));
//     const [isMobile, setIsMobile] = useState(false);
//
//     useEffect(() => {
//         setMaxPage(Math.ceil(totalItems / itemPerPage));
//     }, [itemPerPage, totalItems]);
//
//     useEffect(() => {
//         const check = () => setIsMobile(window.innerWidth <= 768);
//         check();
//         window.addEventListener("resize", check);
//         return () => window.removeEventListener("resize", check);
//     }, []);
//
//     return (
//         <footer className={styles.container}>
//             <div className={styles.paginationInfo}>
//                 Página {page} de {maxPage}
//             </div>
//
//             <div className={styles.buttons}>
//                 {page > 1 && (
//                     <button onClick={() => onBackPage(1)} className={styles.btn}>
//                         <RewindIcon size={20} weight="bold" />
//                     </button>
//                 )}
//                 <button
//                     onClick={() => onBackPage(page - 1)}
//                     className={styles.btn}
//                     disabled={page === 1}
//                 >
//                     <SkipBackIcon size={20} weight="bold" />
//                 </button>
//
//                 <button
//                     onClick={() => onNextPage(page + 1)}
//                     className={styles.btn}
//                     disabled={!hasNextPage}
//                 >
//                     <SkipForwardIcon size={20} weight="bold" />
//                 </button>
//
//                 {hasNextPage && (
//                     <button
//                         onClick={() => onNextPage(maxPage)}
//                         className={styles.btn}
//                     >
//                         <RewindCircleIcon
//                             size={20}
//                             weight="bold"
//                             style={{ rotate: "180deg" }}
//                         />
//                     </button>
//                 )}
//             </div>
//
//             <div className={styles.info}>
//         <span>
//           <ListIcon size={16} /> {totalItems} itens
//         </span>
//                 <span>
//           <ArchiveIcon size={16} /> {quantityItemsList} selecionados
//         </span>
//             </div>
//         </footer>
//     );
// }
