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
import {MobileTable} from "@/components/Forms/mobile/MobileTable";
import {TrashIcon} from "@phosphor-icons/react";
import Pagination from "@/components/pagination";
import {PageableFooter} from "@/components/pageable";
import {useUserLoged} from "@/hooks/useUserLoged";
import {PrivateRoute} from "@/components/security/PrivateRoute";
import {useRouter} from "next/router";

export default function Payments() {

    const PAGE_SIZE = 10;
    const ITEMS_PER_PAGE = '10';
    const {user, isAdmin} = useAuth();
    const router = useRouter();

    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [hasFilter, setHasFilter] = useState(false);
    const [pageSize, setPageSize] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0); // total de páginas
    const [requestPage, setRequestPage] = useState<number>(1);
    const [payments, setPayments] = useState<InstallmentResponseType[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const toastShown = useRef(false);

    useEffect(() => {
        if (!user && !toastShown.current) {
            showToastMessage({
                type: "info",
                message: "Você precisa estar logado para acessar esta página. Faça login para continuar."
            });

            toastShown.current = true;
            router.replace("/");
        }
    }, [user]);



    const [tableComponentMaxHeight, setTableComponentMaxHeight] = useState<string>('');


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
        if(!user) return;
        fetchPayments(hasFilter).then(setPayments)
    }, [user])
    useEffect(() => {
        if(!user) return;
        fetchPayments(hasFilter).then(setPayments)
    }, [user, requestPage])



    async function fetchPayments(withFilter: boolean) {

        let paymentsData = [] as InstallmentResponseType[];


        let paramsList = [] as string[];
        paramsList.push("size=" + ITEMS_PER_PAGE);
        paramsList.push("page=" + (requestPage - 1));

        if (withFilter) {
            setHasFilter(true);
            if (status) paramsList.push("status=" + status);
            if (date) paramsList.push("paymentsData=" + date);
        } else {
            setHasFilter(false)
        }
        // let paramsPayments = "?";
        // for (const paramItem of paramsList) {
        //     paramsPayments += paramItem + "&"
        // }
        let paramsPayments = `?`; // Spring usa paginação começando em 0
        for (const paramItem of paramsList) {
            paramsPayments += paramItem + "&"
        }

        try {
            const {data}: AxiosResponse<PageableResponse<InstallmentResponseType>> = await ApiConnection(window.location.href).get(`/installments${paramsPayments}`, {
                timeout: 5 * 60 * 1000
            })
            paymentsData = data.content;
            setTotalPages(data?.total_pages);
            setTotalElements(data?.total_elements);
            setPageSize(data?.size)
            console.log("response", data);
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

    const handlePageChange = (newPage: number) => {
        console.log("chamou o handle page change")
        setRequestPage(newPage)
    }

    const clientsTableColumns = [
        {
            id: 'installment_number',
            selector: 'installment_number',
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
            id: 'installment_date',
            selector: 'installment_date',
            name: 'Data parcela',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 160,
            cell: (row: InstallmentResponseType) => row?.installment_date ? formatedDate(row.installment_date) : "-"
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
            id: 'payment_date',
            name: "Data Pagamento",
            selector: 'payment_date',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            cell: (row: InstallmentResponseType) => row?.payment_date ? formatedDate(row.payment_date) : "-"
        },
        {
            id: 'receipt_url',
            selector: 'receipt_url',
            name: "Comprovante",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) => row?.receipt_url ? row.receipt_url : "-"
        },
        {
            id: 'receipt_url',
            selector: 'receipt_url',
            name: "Editar",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: InstallmentResponseType) => <EditInstallmentDialog installment={row}/>
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

    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 768});

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <PrivateRoute>
            <Layout>

                <div className={"w-full py-2 px-0 xl:py-4 xl:px-4 gap-2 flex justify-end"}>

                    {payments?.length > 0 &&
                        <Alert
                            titleAlert={`Confirmação de Exclusão`}
                            descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir os registros de pagamentos do sistema? ️`}
                            button={

                                <Button
                                    width={"max-content"}

                                    bgColor={BgColor.RED}
                                    type={ButtonType.BUTTON} value={"Deletar todas"}>

                                    <TrashIcon/>
                                </Button>

                            }
                            onAccept={handleDeleteAll}
                        />
                    }
                    <GeneratedPaymentsDialog reload={() => {
                        fetchPayments(false).then(setPayments)
                    }}/>
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
};