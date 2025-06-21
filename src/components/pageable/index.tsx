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

    if (isSmallScreen) {
        return (
            <div className={`${styles.rootMobile} ${border ? "border border-gray-200 rounded-md p-2" : ""} mt-4`}>
                <div className={styles.mobileNavRow}>
                    <button
                        disabled={page === 1}
                        onClick={() => onBackPage(1)}
                        className={styles.mobileNavButton}
                        title="Primeira página"
                    >
                        <RewindIcon size={'20px'} weight="fill"/>
                    </button>

                    <button
                        disabled={page === 1}
                        onClick={() => onBackPage(page - 1)}
                        className={styles.mobileNavButton}
                        title="Anterior"
                    >
                        <SkipBackIcon size={'20px'} weight="fill"/>
                    </button>

                    <span className={styles.mobilePageInfo}>
                    {page} / {maxPage}
                </span>

                    <button
                        disabled={!hasNextPage}
                        onClick={() => onNextPage(page + 1)}
                        className={styles.mobileNavButton}
                        title="Próxima"
                    >
                        <SkipForwardIcon size={'20px'} weight="fill"/>
                    </button>

                    <button
                        disabled={!hasNextPage}
                        onClick={() => onNextPage(maxPage)}
                        className={styles.mobileNavButton}
                        title="Última página"
                    >
                        <RewindCircleIcon
                            size={'20px'}
                            weight="fill"
                            style={{rotate: '180deg'}}
                        />
                    </button>
                </div>

                <div className={styles.mobileInfoRow}>
                    <div className={styles.mobileInfoBlock}>
                        <ListIcon size={'18px'} weight="bold" style={{ marginRight: '4px' }} />
                        <span>Total:</span>
                        <strong style={{ marginLeft: '4px' }}>
                            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                        </strong>
                    </div>

                    <div className={styles.mobileInfoBlock}>
                        <ArchiveIcon
                            size={'18px'}
                            weight="bold"
                            style={{ marginRight: '4px' }}
                            color={quantityItemsList === 0 ? '#dc2626' : '#15803d'}
                        />
                        <span>Exibindo:</span>
                        <strong style={{ marginLeft: '4px', color: quantityItemsList === 0 ? '#dc2626' : '#15803d' }}>
                            {quantityItemsList} {quantityItemsList === 1 ? 'item' : 'itens'}
                        </strong>
                    </div>
                </div>
            </div>
        );
    }


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
