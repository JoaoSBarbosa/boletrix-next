import {PrivateRoute} from "@/components/security/PrivateRoute";
import {Layout} from "@/components/layout";
import {LocalDebtCard} from "@/components/pages/debt/components";
import {ActionsDropdown} from "@/components/pages/payments/components/actionsDropdown";
import {FiltersDropdown} from "@/components/pages/payments/components/filters";
import {DownloadingOrDeletingBox, Loading} from "@/components/Loadings";
import {
    AlignmentColumnTableProps,
    ColumnTableProps,
    DefaultTable,
    MobileInstallmentTable
} from "@/components/tables/DefaultTable";
import {PageableFooter} from "@/components/pageable";
import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import {CardStatus, formatedDate, showToastMessage, translateLabel} from "@/util/util";
import {InstallmentStatus} from "@/components/pages/payments/dialogs/InstallmentStatus";
import {ReceiptActions} from "@/components/pages/payments/dialogs/ReceiptActions";
import {useEffect, useState} from "react";
import {UserResponseType} from "@/types/user/UserResponseType";
import ApiConnection from "@/util/api";
import {AxiosResponse} from "axios";
import {EditInstallmentDialog} from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import {Alert} from "@/components/alert";
import {TableSpanButton, ThemeSpan} from "@/components/buttons";
import {IoBackspace} from "react-icons/io5";
import {useMediaQuery} from "react-responsive";
import {EditUserSystemDialog} from "@/components/pages/user/dialogs/EditUserSystemDialog";
import {FaCrown, FaUser} from "react-icons/fa";

export default function User() {
    const [showLoading, setShowLoading] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showDownland, setShowDownland] = useState(false);
    const [users, setUsers] = useState<UserResponseType[]>([]);

    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 768});
    const [tableComponentMaxHeight, setTableComponentMaxHeight] = useState<string>('');

    const clientsTableColumns: ColumnTableProps[] = [
        {
            id: 'id',
            selector: 'id',
            name: "#",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 50
        },
        {
            id: 'name',
            selector: 'name',
            name: 'Nome',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200
        },
        {
            id: 'email',
            selector: 'email',
            name: 'E-mail',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200
        },
        {
            id: 'roles',
            selector: 'roles',
            name: 'Acessos',
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 200,
            cell: (row: UserResponseType) =>
                row?.roles ? (
                    <div className="flex flex-wrap gap-1">
                        {row.roles.map(role => translateLabel(role.name))}
                    </div>
                ) : (
                    "-"
                ),

            // cell: (row: UserResponseType) => row?.roles ? row.roles.map(role => translateLabel(role.name)) : "-"
        },

        {
            id: '',
            selector: '',
            name: "",
            alignment: AlignmentColumnTableProps.DIREITA,
            width: 100,
            cell: (row: UserResponseType) => <EditUserSystemDialog user={row}/>
        },
        {
            id: '',
            selector: '',
            name: "",
            alignment: AlignmentColumnTableProps.CENTRALIZADO,
            width: 100,
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
                    onAccept={() => handleDeleteUser(row?.id)}
                />
        }
    ];


    function handleDeleteUser(id: string | number) {

    }

    useEffect(() => {
        getAllUsers().then(setUsers)
    }, []);

    useEffect(() => {
        console.log("USUARIOS: ", users)
    }, [users]);
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

    async function getAllUsers() {


        let userResponse = [] as UserResponseType[];


        // let paramsList = [] as string[];
        // paramsList.push("size=" + ITEMS_PER_PAGE);
        // paramsList.push("page=" + (requestPage - 1));
        //
        // if (withFilter) {
        //     setHasFilter(true);
        //     if (status) paramsList.push("status=" + status);
        //     if (amount) paramsList.push("amount=" + amount);
        //     if (paymentDate) paramsList.push("paymentDate=" + paymentDate);
        //     if (invoiceDate) paramsList.push("invoiceDate=" + invoiceDate);
        //     if (installmentNumber) paramsList.push("installmentNumber=" + installmentNumber);
        // } else {
        //     setHasFilter(false)
        // }
        // let paramsPayments = `?`; // Spring usa paginação começando em 0
        // for (const paramItem of paramsList) {
        //     paramsPayments += paramItem + "&"
        // }


        setShowLoading(true);
        try {
            const response: AxiosResponse<UserResponseType[]> = await ApiConnection(window.location.href).get("/users", {
                timeout: 5 * 60 * 1000
            })
            console.log("DADOS: ", response?.data)
            userResponse = response?.data;
        } catch (err) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar buscar os usuarios do sistema: " + err
            })
        } finally {
            setShowLoading(false)
        }
        return userResponse;
    }

    return (
        <PrivateRoute>
            <Layout>


                {/*<div className={`flex items-center ${isSmallScreen ? "gap-2" : "justify-between"} mb-2`}>*/}

                {/*    <div>*/}
                {/*        <LocalDebtCard debt={payments[0]?.debtDTO}/>*/}
                {/*    </div>*/}
                {/*    <div className={"flex items-center gap-2"}>*/}
                {/*        {user?.roles?.includes("ROLE_ADMIN") &&*/}

                {/*            <ActionsDropdown*/}
                {/*                length={payments?.length}*/}
                {/*                handleDeleteAll={handleDeleteAll}*/}
                {/*                reload={() => {*/}
                {/*                    fetchPayments(false).then(setPayments)*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        }*/}
                {/*        <FiltersDropdown*/}
                {/*            status={status}*/}
                {/*            amount={amount}*/}
                {/*            isMobile={isMobile}*/}
                {/*            setStatus={setStatus}*/}
                {/*            setAmount={setAmount}*/}
                {/*            paymentDate={paymentDate}*/}
                {/*            invoiceDate={invoiceDate}*/}
                {/*            setPaymentDate={setPaymentDate}*/}
                {/*            setInvoiceDate={setInvoiceDate}*/}
                {/*            installmentId={installmentNumber}*/}
                {/*            setInstallmentId={setInstallmentNumber}*/}
                {/*            apply={() => {*/}
                {/*                fetchPayments(true).then(setPayments)*/}
                {/*            }}*/}
                {/*            cleanFilter={handleCleanValues}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*</div>*/}

                {showDelete ?
                    <DownloadingOrDeletingBox isDelete title="Excluindo comprovante(s)"
                                              message="Aguarde enquanto removemos os comprovantes selecionados..."/>
                    : showDownland ?
                        <DownloadingOrDeletingBox isDelete={false} title="Baixando comprovante(s)"
                                                  message="Por favor, aguarde o download..."/>
                        : showLoading ?
                            <Loading title="Carregando registros" message="Buscando informações de pagamentos..."/>
                            :
                            <DefaultTable
                                columns={clientsTableColumns}
                                list={users}
                                maxHeight={tableComponentMaxHeight}
                            />
                    // <>
                    //     {!isClient ? null : isMobile ? (
                    //         <div className={"max-h-[55vh] overflow-auto"}>
                    //             {/*<MobileTable columns={clientsTableColumns} list={payments}/>*/}
                    //             <div className={"bg-red-400"}>COmponete mobile</div>
                    //         </div>
                    //     ) : (
                    //         <DefaultTable
                    //             columns={clientsTableColumns}
                    //             list={users.length > 0 ? users : []}
                    //             maxHeight={tableComponentMaxHeight}
                    //         />
                    //     )}
                    //
                    // </>

                }
            </Layout>
        </PrivateRoute>

    )
}