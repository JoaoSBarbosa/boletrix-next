import {useAuth} from "@/hooks/useAuth";
import {Layout} from "@/components/layout";
import {useEffect, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import ApiConnection from "@/util/api";
import {AxiosResponse} from "axios";
import {PageableResponse} from "@/types/PageableResponse";
import {TableSpanButton, ThemeSpan} from "@/components/buttons";
import {
    AlignmentColumnTableProps,
    ColumnTableProps,
    DefaultTable,
} from "@/components/tables/DefaultTable";
import {Alert} from "@/components/alert";
import {IoBackspace} from "react-icons/io5";
import {EditInstallmentDialog} from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import {CardStatus, formatedDate, getStatusLabel, showToastMessage} from "@/util/util";
import {PageableFooter} from "@/components/pageable";
import {PrivateRoute} from "@/components/security/PrivateRoute";
import {useRouter} from "next/router";
import {ActionsDropdown} from "@/components/pages/payments/components/actionsDropdown";
import {
    FiltersDropdown,
    status,
} from "@/components/pages/payments/components/filters";
import {DebtCard, LocalDebtCard} from "@/components/pages/debt/components";
import {InstallmentStatus} from "@/components/pages/payments/dialogs/InstallmentStatus";
import {useWindowSize} from "@/hooks/useWindowSize";
import {DownloadSimpleIcon} from "@phosphor-icons/react";
import {DownloadingOrDeletingBox, Loading} from "@/components/Loadings";
import {ReceiptActions} from "@/components/pages/payments/dialogs/ReceiptActions";
import {MobileInstallmentTable} from "@/components/pages/payments/components/mobile";
import {PdfExportButton} from "@/components/pdf/PdfExportButtonProps";

export default function Payments() {
    // const ITEMS_PER_PAGE = "100";
    const ITEMS_PER_PAGE = "10";
    const {user, isAuthLoading} = useAuth();
    const router = useRouter();
    const {width} = useWindowSize();
    const isSmallScreen = width <= 640;
    const [status, setStatus] = useState<status>("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [installmentNumber, setInstallmentNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState("");

    const [hasFilter, setHasFilter] = useState(false);
    const [pageSize, setPageSize] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0); // total de páginas
    const [requestPage, setRequestPage] = useState<number>(1);
    const [payments, setPayments] = useState<InstallmentResponseType[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 768});
    const [showLoading, setShowLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDownland, setShowDownland] = useState(false);
    const debtCardRef = useRef<{ reloadDebt: () => void }>(null);

    useEffect(() => {
        if (isAuthLoading) return; // Aguarda o carregamento da autenticação
        if (!user) {
            showToastMessage({
                type: "info",
                message:
                    "Você precisa estar logado para acessar esta página. Faça login para continuar.",
            });
            router.replace("/").then(() => {
                showToastMessage({
                    type: "success",
                    message: "Redirecionando para a tela de login.",
                });
            });
            return;
        }

        // Se chegou aqui, o usuário está autenticado
        // fetchPayments(hasFilter).then(setPayments);
    }, [user, isAuthLoading, requestPage]);
    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setTableComponentMaxHeight(window.innerWidth <= 1366 ? "50vh" : "70vh");
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        if (!user) return;
        fetchPayments(hasFilter).then(setPayments);
    }, [user]);
    useEffect(() => {
        if (!user) return;
        fetchPayments(hasFilter).then(setPayments);
    }, [user, requestPage]);

    const [tableComponentMaxHeight, setTableComponentMaxHeight] =
        useState<string>("");

    const clientsTableColumns: ColumnTableProps[] = [
        {
            id: "installmentNumber",
            selector: "installmentNumber",
            name: "Nº",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 50
        },
        {
            id: "amount",
            selector: "amount",
            name: "Valor",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 100
        },
        {
            id: "installmentDate",
            selector: "installmentDate",
            name: "Data parcela",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            cell: (row: InstallmentResponseType) =>
                row?.installmentDate ? formatedDate(row.installmentDate) : "-",
        },
        {
            id: "status",
            selector: "status",
            name: "Status do Pagamento",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            cell: (row: InstallmentResponseType) =>
                user?.roles?.includes("ROLE_ADMIN") ? (
                    <InstallmentStatus
                        installment={row}
                        reloadData={reloadList}
                        isSmallScreen={isSmallScreen}
                        isMobile={false}
                    />
                ) : (
                    CardStatus(row?.status)
                ),
        },
        {
            width: 200,
            id: "paymentDate",
            name: "Data Pagamento",
            selector: "paymentDate",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            cell: (row: InstallmentResponseType) =>
                row?.paymentDate
                    ? displayDateTime(row.paymentDate, row?.paymentTime)
                    : "-",
        },
        {
            id: "receiptUrl",
            selector: "receiptUrl",
            name: "Comprovante",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) =>
                row?.receiptPath ? (
                    <ReceiptActions
                        onDownload={() => handleDownloadAnnexes(row)}
                        row={row}
                    />
                ) : (
                    ""
                ),
        },
    ];

    // ⬇️ Adiciona colunas extras se for ROLE_ADMIN
    if (user?.roles?.includes("ROLE_ADMIN")) {
        clientsTableColumns.push(
            {
                id: 'edit',
                selector: 'edit',
                name: "Editar",
                alignment: AlignmentColumnTableProps.CENTRALIZADO,
                width: 200,
                cell: (row: InstallmentResponseType) =>
                    <EditInstallmentDialog installment={row} reload={reloadList}/>
            },
            {
                id: 'delete',
                selector: 'delete',
                name: "Excluir",
                alignment: AlignmentColumnTableProps.CENTRALIZADO,
                width: 200,
                cell: (row: InstallmentResponseType) =>
                    <Alert
                        titleAlert="Confirmação de Exclusão"
                        descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${row?.id ? "Nº" + row.id : ""}' do sistema?`}
                        button={
                            <TableSpanButton
                                info="Excluir registro de Cliente"
                                width="max-content"
                                notBg
                                theme={ThemeSpan.RED}
                            >
                                <IoBackspace size={24} color="#b91c1c" className="cursor-pointer inline-flex"/>
                            </TableSpanButton>
                        }
                        onAccept={() => handleDeleteInstallment(row?.id)}
                    />
            }
        );
    }
    const paymentsExportColumns: ColumnTableProps[] = [
        {
            id: "installmentNumber",
            selector: "installmentNumber",
            name: "Nº",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 50,
        },
        {
            id: "amount",
            selector: "amount",
            name: "Valor",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) => row?.amount ? "R$ " + row.amount.toFixed(2) : "-",
        },
        {
            id: "installmentDate",
            selector: "installmentDate",
            name: "Data parcela",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) =>
                row?.installmentDate ? formatedDate(row.installmentDate) : "-",
        },
        {
            id: "status",
            selector: "status",
            name: "Status",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            exportable: true,
            cell: (row: InstallmentResponseType) => getStatusLabel(row?.status),
        },
        {
            width: 200,
            id: "paymentDate",
            name: "Data Pagamento",
            selector: "paymentDate",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            cell: (row: InstallmentResponseType) =>
                row?.paymentDate
                    ? displayDateTime(row.paymentDate, row?.paymentTime)
                    : "-",
        },
        {
            id: "receiptUrl",
            selector: "receiptUrl",
            name: "Comprovante?",
            exportable: true,
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) =>
                row?.receiptPath ? "Sim" : "-"
            ,
        },
    ];

    async function handleDownloadAnnexes(row: InstallmentResponseType) {
        if (!row?.id) {
            showToastMessage({
                type: "warning",
                message:
                    "Downlaod de arquivos - Falha ao tentar baixar o arquivo devido o ID do comprovante do pagamento esta vazio no momento",
            });
            return;
        }
        try {
            setShowDownland(true);
            const response = await ApiConnection(window.location.href).get(
                `/dropbox/download?id=${row?.id}`,
                {
                    responseType: "blob",
                }
            );

            if (response.status === 200) {
                const blob = response.data;
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = row?.receiptPath.split("/").pop() ?? "file.ext";
                document.body.appendChild(a); // Adiciona o link ao documento
                a.click(); // Simule um clique no link
                document.body.removeChild(a); // Remove o link do documento
                window.URL.revokeObjectURL(url);
                // setTableKey((prevKey) => prevKey + 1);
                showToastMessage({
                    type: "success",
                    message: `Download do arquivo '${row?.receiptPath
                        .split("/")
                        .pop()}' concluído com sucesso!`,
                });
            } else {
                showToastMessage({
                    type: "error",
                    message: `Ocorreu um erro ao baixar o arquivo ${row?.receiptPath
                        .split("/")
                        .pop()}. Por favor, verifique a conexão com o Dropbox e tente novamente mais tarde.`,
                });
            }
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar baixar o comprovante",
            });
        }
        setShowDownland(false);
    }

    const displayDateTime = (date: string, time: string) => {
        const formattedDate = formatedDate(date);

        if (formattedDate && time) {
            return `${formattedDate} às ${time}`;
        } else if (formattedDate) {
            return formattedDate;
        } else {
            return `--`;
        }
    };

    async function fetchPayments(withFilter: boolean) {
        let paymentsData = [] as InstallmentResponseType[];

        let paramsList = [] as string[];
        paramsList.push("size=" + ITEMS_PER_PAGE);
        paramsList.push("page=" + (requestPage - 1));

        if (withFilter) {
            setHasFilter(true);
            if (status) paramsList.push("status=" + status);
            if (amount) paramsList.push("amount=" + amount);
            if (paymentDate) paramsList.push("paymentDate=" + paymentDate);
            if (invoiceDate) paramsList.push("invoiceDate=" + invoiceDate);
            if (installmentNumber)
                paramsList.push("installmentNumber=" + installmentNumber);
        } else {
            setHasFilter(false);
        }
        let paramsPayments = `?`; // Spring usa paginação começando em 0
        for (const paramItem of paramsList) {
            paramsPayments += paramItem + "&";
        }

        setShowLoading(true);
        try {
            const {data}: AxiosResponse<PageableResponse<InstallmentResponseType>> =
                await ApiConnection(window.location.href).get(
                    `/installments${paramsPayments}`,
                    {
                        timeout: 5 * 60 * 1000,
                    }
                );
            paymentsData = data.content;
            setTotalPages(data?.totalPages);
            setTotalElements(data?.totalElements);
            setPageSize(data?.size);
        } catch (error) {
            paymentsData = [];
            setTotalPages(0);
            showToastMessage({
                type: "error",
                message: "Erro ao tentar obter a lista de boletos: " + error,
            });
        } finally {
            setShowLoading(false);
        }
        return paymentsData;
    }

    async function handleDeleteInstallment(id: number | string) {
        if (!id) {
            showToastMessage({
                type: "warning",
                message: "Necessario o ID da parcela para excluir",
            });
            return;
        }
        try {
            await ApiConnection(window.location.href).delete(`/installments/${id}`);
            debtCardRef.current?.reloadDebt();
            showToastMessage({
                type: "success",
                message: "Parcela deletada com sucesso!",
            });
            fetchPayments(hasFilter).then(setPayments);
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar deletar o boleto" + error,
            });
        }
    }

    async function handleDeleteAll() {
        if (payments[0].debtDTO?.id === undefined || !payments[0]?.debtDTO?.id) {
            showToastMessage({
                type: "warning",
                message: "Não foi possivel obter o id de divida",
            });
            return;
        }
        try {
            setShowDelete(true);
            await ApiConnection(window.location.href).delete(
                `/installments/all/${payments[0].debtDTO?.id}`
            );
            showToastMessage({
                type: "success",
                message: "Parcelas deletadas com sucesso!",
            });

            fetchPayments(hasFilter).then(setPayments);
        } catch (error) {
            showToastMessage({
                type: "error",
                message:
                    "Erro ao tentar deletar todos os registros de parcelas: " + error,
            });
        } finally {
            setShowDelete(false);
        }
    }

    const handleCleanValues = () => {
        setAmount("");
        setStatus("");
        setInvoiceDate("");
        setInstallmentNumber("");
        setPaymentDate("");
        fetchPayments(false).then(setPayments);
    };

    const reloadList = (updateInstallment: InstallmentResponseType) => {
        setPayments((prev) =>
            prev.map((row) =>
                row.id === updateInstallment?.id ? updateInstallment : row
            )
        );
        debtCardRef.current?.reloadDebt(); // 👈 atualiza os dados da dívida!
    };

    return (
        <PrivateRoute>
            <Layout>
                <div className={`flex items-center ${isSmallScreen ? "gap-2" : "justify-between"} mb-2`}>
                    <div>
                        <LocalDebtCard debt={payments[0]?.debtDTO}/>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        {user?.roles?.includes("ROLE_ADMIN") && (
                            <ActionsDropdown
                                length={payments?.length}
                                handleDeleteAll={handleDeleteAll}
                                reload={() => {
                                    fetchPayments(false).then(setPayments);
                                }}
                            />
                        )}
                        <FiltersDropdown
                            status={status}
                            amount={amount}
                            isMobile={isMobile}
                            setStatus={setStatus}
                            setAmount={setAmount}
                            paymentDate={paymentDate}
                            invoiceDate={invoiceDate}
                            setPaymentDate={setPaymentDate}
                            setInvoiceDate={setInvoiceDate}
                            installmentId={installmentNumber}
                            setInstallmentId={setInstallmentNumber}
                            apply={() => {
                                fetchPayments(true).then(setPayments);
                            }}
                            cleanFilter={handleCleanValues}
                        />

                        <PdfExportButton
                            title="Relatório de Pagamentos"
                            columns={paymentsExportColumns}
                            list={payments}
                            filename="pagamentos.pdf"
                        />
                    </div>
                </div>

                {showDelete ? (
                    <DownloadingOrDeletingBox
                        isDelete
                        title="Excluindo comprovante(s)"
                        message="Aguarde enquanto removemos os comprovantes selecionados..."
                    />
                ) : showDownland ? (
                    <DownloadingOrDeletingBox
                        isDelete={false}
                        title="Baixando comprovante(s)"
                        message="Por favor, aguarde o download..."
                    />
                ) : showLoading ? (
                    <Loading
                        title="Carregando registros"
                        message="Buscando informações de pagamentos..."
                    />
                ) : (
                    <>
                        {!isClient ? null : isMobile ? (
                            <div className={"max-h-[60vh] overflow-auto"}>
                                {/*<MobileTable columns={clientsTableColumns} list={payments}/>*/}
                                <MobileInstallmentTable
                                    list={payments}
                                    onDownload={handleDownloadAnnexes}
                                    reloadData={reloadList}
                                    isSmallScreen={isSmallScreen}
                                    onDelete={handleDeleteInstallment}
                                />
                            </div>
                        ) : (
                            <DefaultTable
                                columns={clientsTableColumns}
                                list={payments.length > 0 ? payments : []}
                                maxHeight={tableComponentMaxHeight}
                            />
                        )}
                        <PageableFooter
                            page={requestPage} // Página atual (começando de 1)
                            itemPerPage={pageSize} // Quantidade de itens por página
                            totalItems={totalElements} // Total de itens no banco
                            quantityItemsList={payments.length} // Itens listados atualmente
                            hasNextPage={requestPage < totalPages} // Se há próxima página
                            onNextPage={(nextPage) => setRequestPage(nextPage)}
                            onBackPage={(backPage) => setRequestPage(backPage)}
                        />
                    </>
                )}
            </Layout>
        </PrivateRoute>
    );
}
