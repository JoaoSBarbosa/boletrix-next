import {useAuth} from "@/hooks/useAuth";
import {Layout} from "@/components/layout";
import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";

import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import ApiConnection from "@/util/api";
import {AxiosResponse} from "axios";
import {PageableResponse} from "@/types/PageableResponse";
import {Button, ButtonType, TableSpanButton, ThemeSpan,} from "@/components/buttons";
import {GeneratedPaymentsDialog} from "@/components/pages/payments/dialogs/GeneratedPaymentsDialog";
import {AlignmentColumnTableProps, ColumnTableProps, DefaultTable} from "@/components/tables/DefaultTable";
import {Alert} from "@/components/alert";
import {IoBackspace} from "react-icons/io5";
import {EditInstallmentDialog} from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import {cardStatus, formatedDate, showToastMessage} from "@/util/util";
import {MobileTable} from "@/components/Forms/mobile/MobileTable";

export default function Payments() {

    const {user, isAdmin} = useAuth();
    const [payments, setPayments] = useState<InstallmentResponseType[]>([]);
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

        fetchPayments().then(setPayments)
    }, [])


    async function fetchPayments() {

        let paymentsData = [] as InstallmentResponseType[]
        try {

            const response: AxiosResponse<PageableResponse<InstallmentResponseType>> = await ApiConnection(window.location.href).get("/installments")
            paymentsData = response.data.content;
            console.log("response", paymentsData);
        } catch (error) {
            paymentsData = [];
            showToastMessage({
                type: "error",
                message: "Erro ao tentar obter a lista de boletos: " + error,
            })
        }
        return paymentsData;
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

    function handleDeleteInstallment(id: number | string) {

    }

    const isMobile = useMediaQuery({maxWidth: 768});

    return (
        <Layout>

            <div className={"w-full p-4 flex justify-end"}>

                <GeneratedPaymentsDialog reload={() => {
                    fetchPayments().then(setPayments)
                }}/>
                {/*<Button type={ButtonType.BUTTON} value={"Gerar parcelas"} width={"max-content"}/>*/}
            </div>

            {isMobile ? (

                <div className={"max-h-[65vh] overflow-auto"}>
                    <MobileTable columns={clientsTableColumns} list={payments}/>

                </div>
            ) : (
                <DefaultTable
                    columns={clientsTableColumns}
                    list={payments.length > 0 ? payments : []}
                    maxHeight={tableComponentMaxHeight}
                    // backgroundTitle={"#FFFFFF"}
                />
            )}


            {/*<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">*/}
            {/*    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">*/}
            {/*        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">*/}
            {/*        <tr>*/}
            {/*            {tableHeaderList?.map((header, index) => (*/}
            {/*                <th scope="col" className="px-6 py-3 text-center" key={index}>*/}
            {/*                    {header}*/}
            {/*                </th>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {payments?.map((payment, index) => (*/}
            {/*            <tr*/}
            {/*                key={index}*/}
            {/*                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"*/}
            {/*            >*/}
            {/*                <td className="px-6 py-4">{payment.id}</td>*/}
            {/*                <td className="px-6 py-4">R$ {payment.amount.toFixed(2)}</td>*/}
            {/*                <td className="px-6 py-4">*/}
            {/*                    {payment?.installment_date ? formatedDate(payment.installment_date) : ""}*/}
            {/*                    /!*{new Date(payment.installment_date).toLocaleDateString("pt-BR")}*!/*/}
            {/*                </td>*/}
            {/*                <td className="px-6 py-4 text-center">*/}
            {/*                    {payment?.payment_date ? formatedDate(payment.payment_date) : "-"}*/}

            {/*                </td>*/}
            {/*                <td className="px-6 py-4">*/}
            {/*                    {payment.receipt_url ? (*/}
            {/*                        <a*/}
            {/*                            href={payment.receipt_url}*/}
            {/*                            target="_blank"*/}
            {/*                            rel="noopener noreferrer"*/}
            {/*                            className="text-blue-600 hover:underline"*/}
            {/*                        >*/}
            {/*                            Ver comprovante*/}
            {/*                        </a>*/}
            {/*                    ) : (*/}
            {/*                        "-"*/}
            {/*                    )}*/}
            {/*                </td>*/}
            {/*                <td className="px-6 py-4">{payment.installment_number}</td>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*        </tbody>*/}

            {/*    </table>*/}
            {/*</div>*/}


        </Layout>

    )
};