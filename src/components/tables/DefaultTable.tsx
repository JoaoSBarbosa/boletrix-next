import React, {useEffect, useState} from "react";
import styles from "./Table.module.css";
import {formatedDate, recalculateHeightComponent} from "@/util/util";
import {EditInstallmentDialog} from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import {Alert} from "@/components/alert";
import {TableSpanButton, ThemeSpan} from "@/components/buttons";
import {IoBackspace} from "react-icons/io5";
import {InstallmentResponseType, StatusType} from "@/types/InstallmentResponseType";
import * as Form from "../Forms";
import {CurrencyInputText, InputText} from "../inputs/InputText";
import {
    ArrowRightIcon,
    CalendarIcon,
    ChartLineIcon,
    FilesIcon,
    MoneyIcon,
    NumberOneIcon,
    ReceiptIcon
} from "@phosphor-icons/react";
import {useAuth} from "@/hooks/useAuth";
import {InstallmentStatus} from "@/components/pages/payments/dialogs/InstallmentStatus";
import {ReceiptActions} from "@/components/pages/payments/dialogs/ReceiptActions";

export enum AlignmentColumnTableProps {
    CENTRALIZADO = 'center',
    ESQUERDA = 'left',
    DIREITA = 'right'
}

export enum HeaderColorsProps {
    LIGHT = "bg-[#d3d4d7] text-[#4A5568]",
    PURPLE_1 = "bg-[#ebd4ff] text-[#6b46c1]",
    DARK = "bg-[#2D3748] text-[#CBD5E0]",
    BLUE = "bg-[#007BFF] text-[#FFFFFF]",
}

export interface ColumnTableProps<T = any> {
    id?: string | number;
    name: string | React.ReactNode;
    onClick?: () => void;
    cell?: (row: T) => React.ReactNode;
    selector: string;
    alignment: AlignmentColumnTableProps;
    width?: string | number;
    background?: (row: T) => string;
    icon?: React.ReactNode;
    showHeader?: boolean;
}

interface DefaultTableProps<T = any> {
    title?: string;
    columns: ColumnTableProps<T>[];
    list: T[];
    maxHeight?: string | number;
    backgroundTitle?: string;
    borderRadius?: string | number;
    noHeight?: boolean;
    containerHeight?: string | number;
}

export const DefaultTable = ({
                                 title,
                                 noHeight,
                                 containerHeight,
                                 columns,
                                 list,
                                 maxHeight,
                                 backgroundTitle,
                                 borderRadius
                             }: DefaultTableProps) => {

    const [widthScreen, setWidthScreen] = useState<number>(0);
    useEffect(() => {
        if (window) {
            setWidthScreen(window.screen.width);
        }
    })

    const dataRows = () => {
        let rowsNode: React.ReactNode[] = [] as React.ReactNode[];

        let contId = 1;
        for (const item of list) {
            rowsNode.push(
                <tr key={item.id === undefined ? contId.toString() : item.id.toString()}>{dataColumns(item)}</tr>
            )
            contId++;
        }

        return rowsNode;
    }

    const dataColumns = (item: any) => {
        let columnsNode: React.ReactNode[] = [] as React.ReactNode[];

        for (const column of columns) {
            if (column?.cell !== undefined) {
                columnsNode.push(
                    <td
                        style={{
                            textAlign: column.alignment,
                            width: column.width === undefined ? 'auto' : column.width,
                            backgroundColor: column.background ? column.background(item) : '#FFFFFF',
                        }}
                    >
                        <div
                            className={styles.columnCell}
                            style={{
                                justifyContent: column.alignment
                            }}
                        >
                            {column.cell(item)}
                        </div>
                    </td>
                )
            } else {
                type ObjectKey = keyof typeof item;
                const fieldObject = column?.selector as ObjectKey;

                columnsNode.push(
                    <td
                        style={{
                            textAlign: column.alignment,
                            width: column.width === undefined ? 'auto' : column.width,
                            backgroundColor: column.background ? column.background(item) : '#FFFFFF'
                        }}
                    >
                        {item[fieldObject]}
                    </td>
                )
            }
        }

        return columnsNode;
    }

    return (
        <div className={` ${styles.tableContent}  ${!noHeight ? "h-full" : ""}`} style={{height: containerHeight}}>
            {
                title &&
                <h2>{title}</h2>
            }

            <div
                className={styles.tableScrowContent}
                style={{
                    // maxHeight: maxHeight,
                    maxHeight: recalculateHeightComponent(widthScreen, maxHeight)
                }}
            >
                <table>
                    <thead>
                    <tr>
                        {
                            columns.map((column, index) =>
                                // eslint-disable-next-line react/jsx-key
                                <th key={index} className={`${backgroundTitle ? backgroundTitle : "bg-gray-200"}`}
                                    style={{
                                        textAlign: column.alignment,
                                        width: column.width === undefined ? 'auto' : column.width,
                                        borderRadius: borderRadius ? borderRadius : ""
                                    }}
                                    onClick={column.onClick}
                                >

                                    <div className={"flex flex-col flex-wrap gap-2 items-center justify-between "}
                                         style={{height: "100%"}}>
                                        {column.name && <span className={""}>{column.name}</span>}
                                        {column.icon && <span style={{marginRight: '8px'}}>{column.icon}</span>}
                                    </div>
                                </th>
                            )
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {dataRows()}
                    </tbody>

                </table>
            </div>
        </div>
    );
}


interface MobileInstallmentTableProps {
    list: InstallmentResponseType[];
    title?: string;
    onDelete: (id: string | number) => void;
    isSmallScreen: boolean;
    reloadData: (data: InstallmentResponseType) => void;
    onDownload: (data: InstallmentResponseType) => void;
}

export const MobileInstallmentTable = ({
                                           list,
                                           title,
                                           onDownload,
                                           reloadData,
                                           isSmallScreen,
                                           onDelete
                                       }: MobileInstallmentTableProps) => {

    const {user} = useAuth();
    const handleShowStatus = (status: StatusType) => {

        switch (status) {
            case "WAITING":
                return "Aguardando";
            case "PAID":
                return "Pago";
            case "PENDING":
                return "Pedente"
            default:
                return "Desconhecido"
        }
    }
    return (
        <>

            {list?.map((item, index) => (

                <Form.Form flexDirection={"column"} customStyles={"bg-gray-800 rounded-md mb-4"}>
                    <Form.FormRows justifyContent={"flex-start"}>
                        <InputText
                            isDark={true}
                            title={"Nº"}
                            value={item?.installmentNumber}
                            width={"50%"}
                        >
                            <FilesIcon/>
                        </InputText>
                        <CurrencyInputText
                            title={"Valor"}
                            isDark={true}
                            value={item?.amount}
                            width={"50%"}
                        >
                            <MoneyIcon/>
                        </CurrencyInputText>
                    </Form.FormRows>
                    <Form.FormRows justifyContent={"flex-start"}>
                        {user?.roles?.includes("ROLE_ADMIN") ?

                            <InstallmentStatus
                                width={"50%"}
                                installment={item}
                                isMobile={ true }
                                reloadData={reloadData}
                                isSmallScreen={isSmallScreen}
                            />
                            :

                            <InputText
                                isDark={true}
                                title={"Status"}
                                value={handleShowStatus(item?.status)}
                                width={"50%"}
                            >
                                <ChartLineIcon/>
                            </InputText>

                        }
                        <InputText
                            title={"Parcela"}
                            value={item?.installmentDate ? formatedDate(item.installmentDate) : "-"}
                            width={"50%"}
                            isDark={true}
                        >
                            <CalendarIcon/>
                        </InputText>

                    </Form.FormRows>

                    <Form.FormRows justifyContent={"flex-start"}>
                        {/*<InputText*/}
                        {/*    title={"Parcela"}*/}
                        {/*    value={item?.installmentDate ? formatedDate(item.installmentDate) : "-"}*/}
                        {/*    width={"50%"}*/}
                        {/*    isDark={true}*/}
                        {/*>*/}
                        {/*    <CalendarIcon/>*/}
                        {/*</InputText>*/}

                        <InputText
                            title={"Data Pagamento"}
                            value={item?.paymentDate ? formatedDate(item.paymentDate) : "-"}
                            width={"50%"}
                            isDark={true}
                        >
                            <CalendarIcon/>
                        </InputText>
                        <InputText
                            title={"Hora Pagamento"}
                            value={item?.paymentTime}
                            width={"50%"}
                            type={"time"}
                            isDark={true}
                        />
                    </Form.FormRows>

                    {/*<Form.FormRows justifyContent={"flex-start"}>*/}
                    {/*        <InputText*/}
                    {/*            title={"Comprovante"}*/}
                    {/*            isDark={ true }*/}
                    {/*            value={item?.receiptUrl ? item.receiptUrl : "-"}*/}
                    {/*            width={"100%"}*/}
                    {/*        >*/}
                    {/*            <ReceiptIcon/>*/}
                    {/*        </InputText>*/}
                    {/*    */}
                    {/*</Form.FormRows>*/}
                    {item?.receiptPath &&
                        // <Form.FormRows justifyContent={"flex-start"}>
                        //     <h2>Comprovante</h2>
                        //     <ReceiptActions
                        //         onDownload={() => onDownload(item)}
                        //         row={item}
                        //     />
                        // </Form.FormRows>

                        <div className={"w-full border-b-2 pb-2 border-gray-500 flex items-center justify-between gap-2"}>

                            <div className={"flex items-center gap-2 text-gray-400"}>
                                <h2>Comprovante</h2>
                                <ArrowRightIcon/>
                            </div>
                            <ReceiptActions
                                onDownload={() => onDownload(item)}
                                row={item}
                            />
                        </div>

                    }

                    <Form.FormRows justifyContent={"flex-start"}>

                        <EditInstallmentDialog
                            installment={item}
                            iconSize={32}
                        />

                        <Alert
                            titleAlert={`Confirmação de Exclusão`}
                            descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${
                                item?.id ? "Nº" + item.id : ""
                            }' do sistema?`}
                            button={
                                <TableSpanButton
                                    info={"Excluir registro de Cliente"}
                                    width={"max-content"}
                                    notBg={true}
                                    theme={ThemeSpan.RED}
                                >
                                    <IoBackspace
                                        size={32}
                                        color={"#b91c1c"}
                                        className={"cursor-pointer inline-flex"}
                                    />
                                </TableSpanButton>
                            }
                            onAccept={() => onDelete(item?.id)}
                        />

                    </Form.FormRows>

                </Form.Form>


            ))}
        </>
    );
};


