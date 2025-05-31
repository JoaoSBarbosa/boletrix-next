import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.css";
import {ReactNode} from "react";


export enum BackgroudColor {
    DARK = "bg-gray-900",
    DARK_GRAY = "bg-gray-800",
    WHITE = "bg-white",
}

interface DropdownMenuCustomProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    sideOffset?: number;
    bgColor?: BackgroudColor;
    width?: string | number;

}

const DropdownMenuCustom: React.FC<DropdownMenuCustomProps> = ({
                                                                   trigger,
                                                                   children,
                                                                   sideOffset = 5,
                                                                   bgColor = BackgroudColor.WHITE,
                                                                   width = "max-content",
                                                               }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild className={"relative"}>
                {trigger}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    style={{
                        width: width
                    }}
                    className={`shadow-2xl ${bgColor} z-50 p-3 mx-2 rounded-md`}
                    sideOffset={sideOffset}
                >
                    {children}
                    <DropdownMenu.Arrow className="DropdownMenuArrow"/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuCustom;

interface DropdownItemButtonProps{
    children: ReactNode
    label: string;
    onClick?: () => void;
}
export const DropdownItemButton = ({children,label, onClick,...rest}:DropdownItemButtonProps) =>{

    return(
        <button
            onClick={ onClick }
            className={`flex items-center gap-2 border-b-2 p-2 rounded-md border-gray-100 hover:bg-gray-800 hover:text-gray-200 w-full`}>
            { children }
            { label }
        </button>
    )
}