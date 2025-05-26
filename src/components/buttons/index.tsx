import {ReactNode} from "react";

export enum ButtonType {
    RESET = "reset",
    SUBMIT = "submit",
    BUTTON = "button"
}

interface ButtonProps {
    type: ButtonType;
    title?: string;
    value: string;
    onClick?: () => void;
    width?: string | number;
}

export const Button = ({title, value, type = ButtonType.BUTTON, onClick, width}: ButtonProps) => {

    return (
        <button
            style={{width: width ? width : "100%"}}
            onClick={onClick}
            title={title}
            type={type}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {value}
        </button>
    )
}

interface UserMenuButtonProps {

    icon: ReactNode;
    name: string;
    onClick?: () => void;


}

export const UserMenuButton = ({icon, onClick, name}: UserMenuButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={"flex items-center gap-2 w-full"}
        >
            {icon}
            {name}
        </button>
    )
}