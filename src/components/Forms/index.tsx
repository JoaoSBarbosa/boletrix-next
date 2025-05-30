import {FormHTMLAttributes, ReactNode} from "react";
import styles from "./Forms.module.css";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    flexDirection: 'row' | 'column';
    justifyContent?: 'center' | 'space-between' | 'flex-end' | 'flex-start';
    alignItems?: 'center' | 'end' | 'flex-end' | 'flex-start' | "self-end" | "start";
    width?: string | number;
    height?: string | number;
    children: ReactNode;
    padding?: number;
    customStyles?: string;


}

export function Form({flexDirection, justifyContent,padding, customStyles, alignItems, width, height, children, ...rest}: FormProps) {
    // @ts-ignore
    return (
        <form
            className={`${styles.formRoot} ${padding ? "p-"+padding: "p-2"} ${customStyles}`}
            style={{
                flexDirection: flexDirection,
                justifyContent: justifyContent,
                alignItems: alignItems,
                width: width ? width : '100%',
                height: height,
            }}
            {...rest}
        >
            {children}
        </form>
    );
}

interface FormRowsProps {
    children: ReactNode;
    justifyContent?: 'center' | 'space-between' | 'flex-end' | 'flex-start';
    alignItems?: 'center' | 'space-between' | 'end' | 'flex-start';
    gap?: number;
    mb?: number;
    mt?: number;
    border?: boolean;
    customStyles?: string;
}

export function FormRows({children,border, customStyles, justifyContent, alignItems, gap, mb, mt}: FormRowsProps) {
    return (
        <div
            className={`${styles.formRowsRoot} ${border ? "border-b-2 border-gray-300" : ""} ${border ? "pb-1": ""} ${customStyles}`}
            style={{
                justifyContent: justifyContent,
                alignItems: alignItems,
                gap: gap,
                marginBottom: mb,
                marginTop: mt
            }}
        >
            {children}
        </div>
    );
}

interface FormColumnsProps {
    children: ReactNode;
    mb?: number;
    mt?: number;
    height?: string | number;
    justifyContent?: 'center' | 'space-between' | 'flex-end' | 'flex-start';
    classNameCustom?: string

}

export function FormColumns({children,height, justifyContent, mb, mt, classNameCustom}: FormColumnsProps) {
    return (
        <div
            className={`${styles.formColumnsRoot} ${classNameCustom}`}
            style={{
                height: height,
                marginBottom: mb,
                marginTop: mt,
                justifyContent: justifyContent,
            }}
        >
            {children}
        </div>
    );
}
