import {useAuth} from "@/hooks/useAuth";
import {Layout} from "@/components/layout";
import {useEffect, useState} from "react";
import {showToastMessage} from "@/util/util";
import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import ApiConnection from "@/util/api";
import {AxiosResponse} from "axios";
import {PageableResponse} from "@/types/PageableResponse";
import {Button, ButtonType} from "@/components/buttons";
import {GeneratedPaymentsDialog} from "@/components/pages/payments/dialogs/GeneratedPaymentsDialog";

export default function Payments() {

    const {user, isAdmin} = useAuth();
    const [payments, setPayments] = useState<InstallmentResponseType[]>([]);

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


    const tableHeaderList = ["ID", "Valor", "Data parcela", "Data Pagamento", "Comprovante", "Nº"]

    return (
        <Layout>

            <div className={"w-full p-4 border border-gray-200 flex justify-end"}>

                <GeneratedPaymentsDialog reload={() => {
                    fetchPayments().then(setPayments)
                }}/>
                {/*<Button type={ButtonType.BUTTON} value={"Gerar parcelas"} width={"max-content"}/>*/}
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableHeaderList?.map((header, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {payments?.map((payment, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-6 py-4">{payment.id}</td>
                            <td className="px-6 py-4">R$ {payment.amount.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                {new Date(payment.installmentDate).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="px-6 py-4">
                                {payment.paymentDate
                                    ? new Date(payment.paymentDate).toLocaleDateString("pt-BR")
                                    : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {payment.receiptUrl ? (
                                    <a
                                        href={payment.receiptUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Ver comprovante
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className="px-6 py-4">{payment.installmentNumber}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>


        </Layout>

    )
};