import {useAuth} from "@/hooks/useAuth";
import {Layout} from "@/components/layout";
import {useEffect, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";

import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import ApiConnection from "@/util/api";
import {AxiosResponse} from "axios";
import {PageableResponse} from "@/types/PageableResponse";
import {BgColor, Button, ButtonType, TableSpanButton, ThemeSpan,} from "@/components/buttons";
import {GeneratedPaymentsDialog} from "@/components/pages/payments/dialogs/GeneratedPaymentsDialog";
import {
    AlignmentColumnTableProps,
    ColumnTableProps,
    DefaultTable,
    MobileInstallmentTable
} from "@/components/tables/DefaultTable";
import {Alert} from "@/components/alert";
import {IoBackspace} from "react-icons/io5";
import {EditInstallmentDialog} from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import {cardStatus, formatedDate, showToastMessage} from "@/util/util";
import {PageableFooter} from "@/components/pageable";
import {PrivateRoute} from "@/components/security/PrivateRoute";
import {useRouter} from "next/router";
import {ActionsDropdown} from "@/components/pages/payments/components/actionsDropdown";
import {FiltersDropdown, status} from "@/components/pages/payments/components/filters";

export default function Payments() {

    const PAGE_SIZE = 10;
    const ITEMS_PER_PAGE = '10';
    const {user, isAdmin, setIsAuthLoading, isAuthLoading} = useAuth();
    const router = useRouter();

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
    const toastShown = useRef(false);
    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 768});

    useEffect(() => {
        if (isAuthLoading) return; // Aguarda o carregamento da autenticação
        if (!user) {
            showToastMessage({
                type: "info",
                message: "Você precisa estar logado para acessar esta página. Faça login para continuar."
            });
            router.replace("/").then(r => {
                showToastMessage({
                    type: "success",
                    message: "Redirecionando para a tela de login."
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
            setTableComponentMaxHeight(window.innerWidth <= 1366 ? '50vh' : '70vh');
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (!user) return;
        fetchPayments(hasFilter).then(setPayments)
    }, [user])
    useEffect(() => {
        if (!user) return;
        fetchPayments(hasFilter).then(setPayments)
    }, [user, requestPage])

    const [tableComponentMaxHeight, setTableComponentMaxHeight] = useState<string>('');
    const clientsTableColumns = [
        {
            id: 'installmentNumber',
            selector: 'installmentNumber',
            name: "Nº",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 50
        },
        {
            id: 'amount',
            selector: 'amount',
            name: 'Valor',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 100
        },
        {
            id: 'installmentDate',
            selector: 'installmentDate',
            name: 'Data parcela',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            cell: (row: InstallmentResponseType) => row?.installmentDate ? formatedDate(row.installmentDate) : "-"

        },
        {
            id: 'status',
            selector: 'status',
            name: 'Status do Pagamento',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            cell: (row: InstallmentResponseType) => cardStatus(row?.status)

        },

        {
            width: 200,
            id: 'paymentDate',
            name: "Data Pagamento",
            selector: 'paymentDate',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            cell: (row: InstallmentResponseType) => row?.paymentDate ? displayDateTime(row.paymentDate, row?.paymentTime) : "-"

        },
        {
            id: 'receiptUrl',
            selector: 'receiptUrl',
            name: "Comprovante",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) => row?.receiptUrl ? row.receiptUrl : "-"
        },
        {
            id: 'receiptUrl',
            selector: 'receiptUrl',
            name: "Editar",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) => <EditInstallmentDialog installment={row}
                                                                           reload={updateSinglePayment}/>
        },
        {
            id: 'receipt_url',
            selector: 'receipt_url',
            name: "Excluir",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) =>
                <Alert

                    titleAlert={`Confirmação de Exclusão`}
                    descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${row?.id ? "Nº" + row.id : ""} ' do sistema? ️`}
                    button={

                        <TableSpanButton
                            info={"Excluir registro de Cliente"}
                            width={'max-content'}
                            notBg={true}
                            theme={ThemeSpan.RED}
                        >
                            <IoBackspace
                                size={24}
                                color={'#b91c1c'}
                                className={"cursor-pointer inline-flex"}/>
                        </TableSpanButton>

                    }
                    onAccept={() => handleDeleteInstallment(row?.id)}
                />
        },
    ] as ColumnTableProps[];

    const displayDateTime = (date: string, time: string) => {

        const formattedDate = formatedDate(date);

        if (formattedDate && time) {
            return `${formattedDate} às ${time}`
        } else if (formattedDate) {
            return formattedDate
        } else {
            return `--`
        }

    }

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
            if (installmentNumber) paramsList.push("installmentNumber=" + installmentNumber);
        } else {
            setHasFilter(false)
        }
        let paramsPayments = `?`; // Spring usa paginação começando em 0
        for (const paramItem of paramsList) {
            paramsPayments += paramItem + "&"
        }

        try {
            const {data}: AxiosResponse<PageableResponse<InstallmentResponseType>> = await ApiConnection(window.location.href).get(`/installments${paramsPayments}`, {
                timeout: 5 * 60 * 1000
            })
            paymentsData = data.content;
            setTotalPages(data?.totalPages);
            setTotalElements(data?.totalElements);
            setPageSize(data?.size)
        } catch (error) {
            paymentsData = [];
            setTotalPages(0);
            showToastMessage({
                type: "error",
                message: "Erro ao tentar obter a lista de boletos: " + error,
            })
        }
        return paymentsData;
    }

    async function handleDeleteInstallment(id: number | string) {
        if (!id) {
            showToastMessage({
                type: "warning",
                message: "Necessario o ID da parcela para excluir"
            })
            return;
        }
        try {
            await ApiConnection(window.location.href).delete(`/installments/${id}`);
            showToastMessage({
                type: "success",
                message: "Parcela deletada com sucesso!"
            })
            fetchPayments(hasFilter).then(setPayments)

        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar deletar o boleto" + error
            })
        }
    }

    async function handleDeleteAll() {
        try {
            await ApiConnection(window.location.href).delete("/installments/all");
            showToastMessage({
                type: "success",
                message: "Parcelas deletadas com sucesso!"
            })

            fetchPayments(hasFilter).then(setPayments)
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar deletar todos os registros de parcelas: " + error
            })
        }
    }

    const handleCleanValues = () =>{
        setAmount("");
        setStatus("");
        setInvoiceDate("");
        setInstallmentNumber("");
        setPaymentDate("");
        fetchPayments(false).then(setPayments)
    }

    const updateSinglePayment = (updateInstallment: InstallmentResponseType) => {
        setPayments((prev) => prev.map((row) => row.id === updateInstallment?.id ? updateInstallment : row))
    }


    return (
        <PrivateRoute>
            <Layout>

                <div className={"flex items-center justify-end gap-2"}>
                    {user?.roles?.includes("ROLE_ADMIN") &&

                        <ActionsDropdown
                            length={payments?.length}
                            handleDeleteAll={handleDeleteAll}
                            reload={() => {
                                fetchPayments(false).then(setPayments)
                            }}
                        />
                    }
                    <FiltersDropdown
                        status={status}
                        amount={ amount }
                        isMobile={ isMobile }
                        setStatus={setStatus}
                        setAmount={ setAmount }
                        paymentDate={paymentDate}
                        invoiceDate={invoiceDate}
                        setPaymentDate={setPaymentDate}
                        setInvoiceDate={setInvoiceDate}
                        installmentId={ installmentNumber }
                        setInstallmentId={ setInstallmentNumber }
                        apply={() => {fetchPayments(true).then(setPayments)}}
                        cleanFilter={handleCleanValues}
                    />
                </div>


                {!isClient ? null : isMobile ? (
                    <div className={"max-h-[55vh] overflow-auto"}>
                        {/*<MobileTable columns={clientsTableColumns} list={payments}/>*/}
                        <MobileInstallmentTable
                            list={payments}
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
            </Layout>
        </PrivateRoute>

    )
}
;