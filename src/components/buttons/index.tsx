import {ReactNode} from "react";

export enum ButtonType {
    RESET = "reset",
    SUBMIT = "submit",
    BUTTON = "button"
}


enum BgColor {
    BLUE = "bg-blue-500 text-white",
    DARK = "bg-blue-700",
    DARKER = "bg-blue-800",
    RED = "bg-red-500",
    GREEN = "bg-green-500",
    YELLOW = "bg-yellow-500",
    PURPLE = "bg-purple-500",
}

interface ButtonProps {
    type: ButtonType;
    title?: string;
    value: string;
    onClick?: () => void;
    width?: string | number;
    bgColor?: BgColor;
    children?: React.ReactNode;
}

export const Button = ({title,children, value, bgColor = BgColor.BLUE,  type = ButtonType.BUTTON, onClick, width}: ButtonProps) => {

    return (
        <button
            style={{width: width ? width : "100%"}}
            onClick={onClick}
            title={title}
            type={type}
            className={`
            w-full flex items-center gap-2 text-white ${bgColor} font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center`}>
            {children}
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