import React from "react";
import styles from "./MobileTable.module.css";
import {ColumnTableProps} from "@/components/tables/DefaultTable";

interface MobileTableProps<T = any> {
    columns: ColumnTableProps<T>[];
    list: T[];
    title?: string;
}

export const MobileTable = <T,>({ columns, list, title }: MobileTableProps<T>) => {
    return (
        <div className={styles.mobileTableContent}>
            {title && <h2 className={styles.title}>{title}</h2>}

            {list.map((item: T, index: number) => (
                <div key={index} className={styles.card}>
                    {columns.map((column, idx) => {
                        return (
                            <div key={idx} className={styles.row}>
                                <span className={styles.label}>
                                    {column.name}
                                </span>
                                <span className={styles.value}>
                                    {column.cell
                                        ? column.cell(item)
                                        : String(item[column.selector as keyof T])}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};