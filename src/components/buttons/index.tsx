import React, {ReactNode} from "react";

export enum ButtonType {
    RESET = "reset",
    SUBMIT = "submit",
    BUTTON = "button"
}


export enum BgColor {

    PRIMARY_SYSTEM = "bg-[#00384D] text-white",   // Azul escuro institucional
    SECONDARY_SYSTEM = "bg-[#E5B96C] text-black", // Bege claro dourado
    TERTIARY_SYSTEM = "bg-[#B8860B] text-white",  // Ouro queimado
    QUATERNARY_SYSTEM = "bg-[#8B6508] text-white", // Bronze escuro

    BLUE = "bg-blue-500 text-white",
    RED = "bg-red-500",
    GREEN = "bg-green-500",
    YELLOW = "bg-yellow-500",
    PURPLE = "bg-purple-500",
    SLATE = "bg-slate-700 text-white",
    ZINC = "bg-zinc-800 text-white",
    NEUTRAL = "bg-neutral-700 text-white",
    STONE = "bg-stone-600 text-white",
    DARK = "bg-gray-800 text-white",
    DARKER = "bg-gray-900 text-white",
    BLACK = "bg-black text-white",

    SECONDARY = "bg-tertiary text-white",
    ACCENT_BLUE = "bg-blue-500 text-white", // #3B82F6 (azul celeste vibrante)
    SUCCESS = "bg-lime-500 text-white",      // #84CC16 (verde limão vibrante)
    WARNING = "bg-orange-500 text-white",    // #F97316 (laranja vivo)
    PINK = "bg-pink-500 text-white",

    SUCCESS_2 = "bg-[#3EB489] text-white",       // Verde Menta, alegre e natural
    WARNING_2 = "bg-[#D4A017] text-white",       // Amarelo Mostarda, vibrante mas sóbrio
    ACCENT = "bg-[#FF6F61] text-white",        // Coral Suave, quente e vibrante
    INFO = "bg-[#3A8DFF] text-white"
}

interface ButtonProps {
    type: ButtonType;
    title?: string;
    value: string;
    onClick?: () => void;
    width?: string | number;
    bgColor?: BgColor;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const Button = ({
                           title,
                           children,
                           disabled,
                           value,
                           bgColor = BgColor.BLUE,
                           type = ButtonType.BUTTON,
                           onClick,
                           width,
                           ...rest
                       }: ButtonProps) => {

    return (
        <button
            {...rest}
            disabled={disabled}
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

















export const ButtonRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            title,
            children,
            disabled,
            value,
            bgColor = BgColor.BLUE,
            type = ButtonType.BUTTON,
            onClick,
            width,
            ...rest
        },
        ref
    ) => {
        return (
            <button
                {...rest}
                ref={ref}
                disabled={disabled}
                style={{ width: width ? width : "100%" }}
                onClick={onClick}
                title={title}
                type={type}
                className={`
                    w-full flex items-center gap-2 text-white ${bgColor} font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center mb-2`}
            >
                {children}
                {value}
            </button>
        );
    }
);

ButtonRef.displayName = "ButtonRef";



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
            className={"inline-flex items-center gap-2 w-full"}
        >
            {icon}
            {name}
        </button>
    )
}


export enum ThemeSpan {
    BLUE = 'hover:border-blue-400 hover:bg-sky-100',
    RED = 'hover:border-red-400 hover:bg-red-100',
    RED_2 = 'hover:border-red-400 hover:bg-red-100',
    GREEN = 'hover:border-green-400 hover:bg-green-100',
    YELLOW = 'hover:border-yellow-400 hover:bg-yellow-100',
    PURPLE = 'hover:border-purple-400 hover:bg-purple-100',
    ORANGE = 'hover:border-orange-400 hover:bg-orange-100',
    TEAL = 'hover:border-teal-400 hover:bg-teal-100',
    PINK = 'hover:border-pink-400 hover:bg-pink-100',
    CYAN = 'hover:border-cyan-400 hover:bg-cyan-100',
    LIME = 'hover:border-lime-400 hover:bg-lime-100',
    INDIGO = 'hover:border-indigo-400 hover:bg-indigo-100',
    GRAY = 'hover:border-gray-400 hover:bg-gray-100',
}

export enum BackgroundColor {
    BLUE = 'bg-blue-200',
    GRAY = 'bg-gray-200',
    GREEN = 'bg-green-200'
}

interface ITableSpanButton {
    title?: string;
    info?: string;
    width?: string | number;
    children?: ReactNode;
    fontSize?: number | string;
    notWeight?: boolean;
    notHover?: boolean;
    // bgColor?: BackGroundColorEnums;
    onClick?: (value: any) => void;
    clickId?: string;
    notBg?: boolean;
    bgColor?: BackgroundColor;
    theme?: ThemeSpan
}


export const TableSpanButton = ({
                                    title,
                                    info,
                                    theme = ThemeSpan.BLUE,
                                    bgColor = BackgroundColor.GRAY,
                                    onClick,
                                    width,
                                    notWeight,
                                    fontSize,
                                    children,
                                    notHover,
                                    clickId,
                                    notBg,
                                    ...rest
                                }: ITableSpanButton) => {

    return (
        <button
            onClick={onClick}
            {...rest}
            title={info}
            // className={`
            // ${width} flex cursor-pointer
            // ${!notBg ? "bg-gray-200" : ""} rounded p-1
            // hover:bg-sky-100 border border-transparent
            // hover:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-lg`}>
            className={`
            ${width} flex cursor-pointer 
            ${!notBg ? bgColor : ""} rounded p-1 
            border border-transparent ${theme}
            transition-all duration-300 ease-in-out hover:shadow-lg`}>
            {/* <span style={{fontSize: fontSize && fontSize}}>*/}
            {/*    {title}*/}
            {/*</span>*/}
            {/* {*/}
            {/*     children &&*/}
            {/*     <div className={styles.tableButtonIcon}>*/}
            {/*         {children}*/}
            {/*     </div>*/}
            {/* }*/}

            {title}
            {children}

        </button>
    )

}
