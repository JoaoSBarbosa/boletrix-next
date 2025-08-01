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
      exportable?: boolean; // ✅ NOVO

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





