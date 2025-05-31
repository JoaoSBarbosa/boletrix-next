import {
    ChangeEvent,
    forwardRef,
    InputHTMLAttributes,
    ReactNode, SelectHTMLAttributes,
    TextareaHTMLAttributes, useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import * as Label from '@radix-ui/react-label';
import {useMask} from '@react-input/mask';
import CurrencyInput, {CurrencyInputProps} from "react-currency-input-field";

// DatePickerForm.tsx
import {
    CaretDown,
    DotsThreeOutlineVertical,
    Eye,
    EyeSlash,
    FileDashed,
    FilePlus,
    Password
} from '@phosphor-icons/react';
import React, {KeyboardEvent} from 'react';

// CSS of Componenet
import styles from './InputText.module.css';
import scrollStyles from "../../styles/customerScroll/CustomerScrol.module.css"

export enum InputTextColorEnum {
    DEFAULT = '#374151',
    RED = '#dc2626',
    BLUE = '#2563eb',
}

export enum TagColor {
    RED = '#dc2626', // Vermelho
    GREEN = "#15803d", // Verde
    BLUE = '#2563eb', // Azul
    GRAY = '#6b7280', // Cinza neutro
    BLACK = '#111827', // Preto sutil para contraste
    DARK_BLUE = '#1e40af', // Azul escuro
    TEAL = '#0d9488', // Verde-água minimalista
    LIGHT_GREEN = '#4ade80', // Verde claro
    LIGHT_BLUE = '#60a5fa', // Azul claro
    ORANGE = '#f97316', // Laranja discreto
    YELLOW = '#facc15', // Amarelo pastel
    PURPLE = '#9333ea', // Roxo vibrante
    PINK = '#ec4899', // Rosa minimalista
    LIGHT_GRAY = '#d1d5db', // Cinza claro
}

export enum BadgeColor {
    YELLOW = "bg-yellow-100 text-yellow-800 border border-yellow-400",
    BLUE = "bg-blue-100 text-blue-800 border border-blue-400",
    GREEN = "bg-green-100 text-green-800 border border-green-400",
    ORANGE = "bg-orange-100 text-orange-800 border border-orange-400",
    RED = "bg-red-100 text-red-800 border border-red-400",
}


interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    width?: string | number;
    justNumber?: boolean;
    notMargin?: boolean;
    allowDecimal?: boolean;
    children?: ReactNode;
    isDisabled?: boolean;
    tagColor?: TagColor | null;
    isBadge?: boolean;
    pointer?: boolean;
    badgeText?: string;
    badgeColor?: BadgeColor;
    compactMode?: boolean;
    cursorText?: boolean;
    isText?: boolean;
    isInputSelected?: boolean;
    isDark?: boolean;
}

export function InputText({
                              onClick,
                              title,
                              isDark,
                              width,
                              notMargin,
                              tagColor,
                              isInputSelected,
                              isDisabled,
                              justNumber,
                              allowDecimal,
                              children,
                              badgeText,
                              pointer,
                              isBadge,
                              badgeColor = BadgeColor.YELLOW,
                              compactMode,
                              cursorText,
                              ...rest
                          }: InputTextProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleColorTag = () => {
        return tagColor || (isFocused ? InputTextColorEnum.DEFAULT : '#79808c');
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!justNumber) return;
        const pattern = allowDecimal ? /[0-9.]/ : /[0-9]/;
        if (!pattern.test(event.key)) event.preventDefault();
    };

    const baseClasses = `
    flex flex-col items-start justify-center w-full p-1 transition-colors duration-500
    ${isDisabled ? "bg-gray-100" : ""} 
    ${cursorText ? "cursor-text" : ""}
  `;

    const compactClasses = `
    ${baseClasses}
    ${isInputSelected ? "border-none" : "border-b-2 border-gray-300"}
  `;

    const normalClasses = `
    ${baseClasses}
    border-b-2 ${isFocused ? "border-gray-700" : "border-gray-300"}
  `;

    const inputContainerClasses = compactMode
        ? `flex items-center gap-1 w-full ${isInputSelected ? "relative border border-gray-500 bg-gray-200 rounded p-0.5" : ""}`
        : "flex items-center justify-between w-full pt-2";

    const inputClasses = `
    w-full bg-transparent font-medium outline-none
    ${isDark ? "text-white": ""}
    ${compactMode ? "text-xs" : "text-lg"}
    ${pointer ? "cursor-pointer" : ""} 
    ${cursorText ? "cursor-text" : ""}
    ${!notMargin && !compactMode ? "my-1" : "m-0"}
    placeholder-gray-300 placeholder-opacity-50
  `;

    const formattedTitle = title?.includes(':') ? title : title + ':';
    const showBadge = isBadge && badgeText;

    return (
        <Label.Root
            className={compactMode ? compactClasses : normalClasses}
            style={{
                color: compactMode && isInputSelected ? "#4A5568" : handleColorTag(),
                width: width || '100%',
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <div className="flex gap-1 items-center">
                {formattedTitle}
                {showBadge && (
                    <span className={`${badgeColor} text-xs font-medium me-2 px-1 py-0.5 rounded`}>
            {badgeText}
          </span>
                )}
            </div>

            <div className={inputContainerClasses}>
                <input
                    onClick={onClick}
                    id={title.toLowerCase().replace(/ /g, '')}
                    className={inputClasses}
                    autoComplete="off"
                    onKeyPress={handleKeyPress}
                    {...rest}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {children && (
                    <div className={`flex items-center justify-center h-full ${compactMode ? "w-5" : "w-7"}`}>
                        {children}
                    </div>
                )}
            </div>
        </Label.Root>
    );
}

// export function InputText({
//                               onClick,
//                               title,
//                               width,
//                               notMargin,
//                               tagColor,
//                               isInputSelected,
//                               isDisabled,
//                               justNumber,
//                               allowDecimal,
//                               children,
//                               badgeText,
//                               pointer,
//                               isText,
//                               isBadge,
//                               badgeColor = BadgeColor.YELLOW,
//                               compactMode,
//                               cursorText,
//                               ...rest
//                           }: InputTextProps) {
//
//     const [isFocused, setIsFocused] = useState<boolean>(false);
//
//     const handleColor = () => {
//
//     }
//
//     const handleColorTag = () => {
//         if (tagColor) {
//             return tagColor; // Se tagColor estiver definido, use essa cor independentemente de isFocused
//         } else if (isFocused) {
//             return InputTextColorEnum.DEFAULT; // Se isFocused for verdadeiro e tagColor não estiver definido, use a cor padrão
//         } else {
//             return '#79808c'; // Caso contrário, use outra cor padrão
//         }
//     }
//
//     const handleKeyPress = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         if (justNumber && !allowDecimal) {
//             if (!/[0-9]/.test(event.key)) {
//                 event.preventDefault();
//             }
//         } else if (justNumber && allowDecimal) {
//             if (!/[0-9\.]/.test(event.key)) {
//                 event.preventDefault();
//             }
//         }
//     };
//     if (compactMode) {
//         return (
//             <Label.Root
//                 className={`
//                 ${styles.compactLabelRoot}
//                  ${isDisabled ? "bg-gray-100" : ""}
//                 ${isInputSelected ? "border-none" : ""}
//                 ${cursorText ? "cursor-text" : ""}`}
//                 style={{
//                     transition: '0.5s',
//                     color: isInputSelected ? "#4A5568" : handleColorTag(), // Cor do texto mais suave
//                     borderColor: isFocused ? '#4A5568' : '#CBD5E0', // Bordas mais suaves
//                     width: width ? width : '100%',
//                     border: isInputSelected ? "none" : "",
//                 }}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//             >
//                 {title.includes(':') ? title : title + ':'}
//
//                 <div
//                     className={`${styles.inputTextContainer} ${isInputSelected ? "relative border border-gray-500 bg-gray-200" : ""}`}
//                     style={isInputSelected ? {
//                         padding: '2px',
//                         backgroundColor: '#E2E8F0', // Fundo mais claro e suave
//                         border: '1px solid #A0AEC0', // Borda mais suave
//                         borderRadius: '4px', // Bordas levemente arredondadas
//                         boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra interna para efeito retro
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '4px',
//                     } : {}}
//                 >
//                     <input
//                         onClick={onClick}
//                         id={title.toLowerCase().replace(/ /g, '')}
//                         className={ `${styles.compactInputText} ${cursorText ? "cursor-text" : ""} placeholder-opacity-50 placeholder-gray-100`}
//                         autoComplete={'off'}
//                         onKeyPress={(event) => {
//                             if (justNumber !== undefined && justNumber) {
//                                 if (!/[0-9]/.test(event.key))
//                                     event.preventDefault();
//                             }
//                         }}
//                         {...rest}
//                         onFocus={() => setIsFocused(true)}
//                         onBlur={() => setIsFocused(false)}
//                         style={isInputSelected ? {
//                             padding: '2px',
//                             backgroundColor: '#EDF2F7', // Fundo mais claro
//                             border: '1px solid #A0AEC0', // Borda mais suave
//                             borderRadius: '4px', // Bordas levemente arredondadas
//                             boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra interna
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '4px',
//                         } : {}}
//                     />
//
//                     {children &&
//                         <div className={styles.compactInputIcon}>
//                             {children}
//                         </div>
//                     }
//                 </div>
//             </Label.Root>
//         );
//     }
//
//
//
//     return (
//         <Label.Root
//
//             className={`
//             ${styles.labelRoot}
//             ${isDisabled ? "bg-gray-100" : ""}
//             ${cursorText ? "cursor-text" : ""}
//             `}
//             style={{
//                 transition: '0.5s',
//                 color: handleColorTag(),
//                 // color: isFocused && !tagColor ? '#374151' : '#79808c' ,
//                 borderColor: isFocused ? '#374151' : '#D1D5DB',
//                 width: width ? width : '100%',
//             }}
//             onChange={handleColor}
//         >
//             <div className={"flex gap-1 items-center"}>
//                 {title?.includes(':') ? title : title + ':'}
//                 {isBadge && badgeText ? (
//                         <span
//                             className={`${badgeColor} text-xs font-medium me-2 px-1 py-0.5 rounded`}>
//                         {badgeText}
//                     </span>
//                     )
//                     : ""
//                 }
//             </div>
//
//             <div className={styles.inputTextContainer}>
//                 <input
//                     onClick={onClick}
//                     id={title?.toLowerCase().replace(/ /g, '')}
//                     className={`
//                     ${styles.inputText} focus:ring-0
//                     ${pointer ? "cursor-pointer" : ""}
//                     ${cursorText ? "cursor-text" : ""} `}
//                     style={{
//                         margin: !notMargin ? "4px 0" : "0"
//                     }}
//                     autoComplete={'off'}
//                     onKeyPress={handleKeyPress}
//                     {...rest}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//
//                 />
//
//                 {children &&
//                     <div className={styles.inputIcon}>
//                         {children}
//                     </div>
//                 }
//             </div>
//         </Label.Root>
//     );
// }


interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    width?: string | number;
    justNumber?: boolean;
    children?: ReactNode;
    row?: number;
    cols?: number;
    isDisabled?: boolean;
}

export function TextArea({title, onClick, width, isDisabled, justNumber, children, row, cols, ...rest}: TextAreaProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (justNumber && !/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <Label.Root
            className={`${styles.labelRoot} ${isDisabled ? "bg-gray-100" : ""}`}

            style={{
                transition: '0.5s',
                color: isFocused ? '#374151' : '#79808c',
                borderColor: isFocused ? '#374151' : '#D1D5DB',
                width: width ? width : '100%',
            }}
        >
            {title.includes(':') ? title : title + ':'}
            <div className={`${styles.inputTextContainer}`}>
                <textarea
                    onClick={onClick}
                    rows={row ? row : 5}
                    cols={cols ? cols : 5}
                    id={title.toLowerCase().replace(/ /g, '')}
                    className={`${styles.inputText} focus:ring-0 resize-none`}
                    autoComplete={'off'}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                />
                {children &&
                    <div className={styles.inputIcon}>
                        {children}
                    </div>
                }
            </div>
        </Label.Root>
    );
}

export enum LebelTextColor {
    INSERT = "text-blue-600",
    QUERY = "text-gray-500",
    MAIN = "text-purple-600",
}


interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    width?: string | number;
    clearFilesFunction?: (clearFiles: () => void) => void;
    isDisable?: boolean;
}

export function InputFile({title, width, clearFilesFunction, isDisable, ...rest}: InputFileProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [filesNameList, setFilesNameList] = useState([] as string[]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const inputFile = fileInputRef.current;

        if (inputFile) {
            inputFile.addEventListener('change', handleListFilesSelected);
        }

        return () => {
            // Remova o ouvinte de eventos quando o componente for desmontado
            if (inputFile) {
                inputFile.removeEventListener('change', handleListFilesSelected);
            }
        };
    }, []);


    const handleListFilesSelected = (event: any) => {
        let filesNameList = [];

        for (const file of event.target.files)
            filesNameList.push(file.name);

        setFilesNameList(filesNameList);
    }

    const clearFiles = () => {
        setFilesNameList([]);
    }

    useEffect(() => {
        if (clearFilesFunction) {
            clearFilesFunction(clearFiles);
        }
    }, [clearFilesFunction]);

    return (
        <Label.Root className={styles.labelRoot} style={{
            transition: '0.5s',
            color: isFocused ? '#374151' : '#9CA3AF',
            borderColor: isFocused ? '#374151' : '#D1D5DB',
            width: width ? width : '100%',
        }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label={'Selecione os arquivos'}
        >
            <div
                className={`w-full h-full py-2 flex items-center justify-between bg-transparent outline-none cursor-pointer`}>
                <p>{filesNameList.length === 0 ? 'Clique para selecionar os arquivos' : '...'}</p>
                <div className={"flex flex-row "}>
                    <input
                        ref={fileInputRef}
                        id={title?.toLowerCase().replace(/ /g, '')}
                        className={`w-full bg-transparent hidden  font-bold text-sm outline-none`}
                        autoComplete={'off'}
                        {...rest}
                        type={'file'}
                    />
                    <div className={styles.inputIcon}>
                        <FileDashed
                            size={'50%'}
                            weight="bold"
                        />
                    </div>
                </div>
            </div>

            {
                filesNameList.map((fileName) =>
                    <div
                        className={styles.fileItem}
                        aria-label={'Item ' + fileName}
                    >
                        <div className={styles.fileItemIcon}>
                            <FilePlus
                                size={'80%'}
                                weight="fill"
                            />
                        </div>

                        {fileName}
                    </div>
                )
            }
        </Label.Root>
    );
}


interface InputTextAndButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    width?: string | number;
    justNumber?: boolean;
    notMargin?: boolean;
    allowDecimal?: boolean;
    children?: ReactNode;
    isDisabled?: boolean;
    tagColor?: TagColor;
}

export function InputTextAndButton({
                                       title,
                                       width,
                                       notMargin,
                                       tagColor,
                                       isDisabled,
                                       justNumber,
                                       allowDecimal,
                                       children,
                                       ...rest
                                   }: InputTextAndButtonProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleColor = () => {

    }

    const handleColorTag = () => {
        if (tagColor) {
            return tagColor; // Se tagColor estiver definido, use essa cor independentemente de isFocused
        } else if (isFocused) {
            return InputTextColorEnum.DEFAULT; // Se isFocused for verdadeiro e tagColor não estiver definido, use a cor padrão
        } else {
            return '#79808c'; // Caso contrário, use outra cor padrão
        }
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (justNumber && !allowDecimal) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        } else if (justNumber && allowDecimal) {
            if (!/[0-9\.]/.test(event.key)) {
                event.preventDefault();
            }
        }
    };
    return (
        <Label.Root

            className={`w-full p-1 flex items-start justify-center flex-col border-b-2 border-gray-300 font-light text-[15px] text-[#898f9a] ${isDisabled ? "bg-gray-100" : ""}`}
            style={{
                transition: '0.5s',
                color: handleColorTag(),
                borderColor: isFocused ? '#374151' : '#D1D5DB',
                width: width ? width : '100%',
            }}
            onChange={handleColor}
        >
            {title.includes(':') ? title : title + ':'}

            <div className={`w-full h-full flex items-center justify-between flex-row pt-2 `}>
                <input
                    id={title.toLowerCase().replace(/ /g, '')}
                    className={`w-3/4 placeholder:text-gray-400  bg-transparent font-semibold text-md outline-none border-none p-0 m-0 focus:ring-0`}
                    autoComplete={'off'}
                    onKeyPress={handleKeyPress}
                    {...rest}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}

                />

                {children &&
                    <div className={`w-1/4 h-full flex items-center justify-center flex-col`}>
                        {children}
                    </div>
                }
            </div>
        </Label.Root>
    );
}


interface OptionSelection {
    label: string;
    value: string | number;
}

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    options: OptionSelection[];
    width?: string | number;
    isDisabled?: boolean;
    maxHeight?: string | number; // Adicionando a nova prop
    [key: string]: any; // Para outras props

}

export function InputSelect({
                                title,
                                options,
                                width,
                                isDisabled,
                                maxHeight,
                                ...rest
                            }: InputSelectProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | number | undefined>(undefined);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <label
            className={`flex  items-start justify-center flex-col font-light text-[15px] text-[#898f9a] ${isDisabled ? "bg-gray-100" : ""}`}
            style={{
                transition: '0.5s',
                color: isFocused ? '#374151' : '#79808c',
                width: width ? width : '100%',
            }}
        >
            <span className={"text-sm mb-1"}>{title.includes(':') ? title : title + ':'}</span>
            <div className={`w-full h-full flex items-center justify-between flex-row`}>
                <select
                    id={title.toLowerCase().replace(/ /g, '')}
                    className={`${styles.customSelect} w-full bg-transparent font-semibold text-sm outline-none border-none p-0 m-0 focus:ring-0`}
                    autoComplete="off"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={selectedValue}
                    disabled={isDisabled}
                    style={{
                        maxHeight: '100px',
                        overflowY: 'auto', // Para permitir rolagem se exceder a altura
                    }}
                    {...rest}
                >
                    <option value="">Selecione uma opção</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

            </div>
        </label>
    );
}


interface DropdownOption {
    label: string;
    value: string | number;
}

interface InputDropdownSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    options: DropdownOption[];
    width?: string | number;
    isDisabled?: boolean;
    maxHeight?: string; // Nova prop para altura máxima
}


interface InputTextPropsRef extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    width?: string | number;
    justNumber?: boolean;
    notMargin?: boolean;
    allowDecimal?: boolean;
    children?: React.ReactNode;
    isDisabled?: boolean;
    tagColor?: string | null;
    isBadge?: boolean;
    pointer?: boolean;
    badgeText?: string;
    badgeColor?: string;
    compactMode?: boolean;
    cursorText?: boolean;
}

const InputTextRef = React.forwardRef<HTMLInputElement, InputTextPropsRef>(({
                                                                                title,
                                                                                width,
                                                                                notMargin,
                                                                                tagColor,
                                                                                isDisabled,
                                                                                justNumber,
                                                                                allowDecimal,
                                                                                children,
                                                                                badgeText,
                                                                                pointer,
                                                                                isBadge,
                                                                                badgeColor = "bg-yellow-400", // Defina a cor padrão para badge
                                                                                compactMode,
                                                                                cursorText,
                                                                                ...rest
                                                                            }, ref) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleColorTag = () => {
        if (tagColor) {
            return tagColor;
        } else if (isFocused) {
            return '#374151'; // Cor quando o campo estiver em foco
        } else {
            return '#79808c'; // Cor padrão
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (justNumber && !allowDecimal) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        } else if (justNumber && allowDecimal) {
            if (!/[0-9\.]/.test(event.key)) {
                event.preventDefault();
            }
        }
    };
    if (compactMode) {
        return (
            <Label.Root
                className={`${styles.compactLabelRoot} ${isDisabled ? "bg-gray-100" : ""} ${cursorText ? "cursor-text" : ""}`}
                style={{
                    transition: '0.5s',
                    color: handleColorTag(),
                    borderColor: isFocused ? '#374151' : '#D1D5DB',
                    width: width ? width : '100%'
                }}
            >
                <div className={"flex gap-1 items-center"}>
                    {title?.includes(':') ? title : title + ':'}
                    {isBadge && badgeText ? (
                        <span className={`${badgeColor} text-xs font-medium px-1 py-0.5 rounded`}>
                        {badgeText}
                    </span>
                    ) : null}
                </div>

                <div className={styles.inputTextContainer}>
                    <input
                        ref={ref} // Usando a referência aqui
                        className={styles.compactInputText}
                        style={{margin: !notMargin ? "4px 0" : "0"}}
                        autoComplete="off"
                        onKeyPress={handleKeyPress}
                        {...rest}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {children && <div className={styles.compactInputIcon}>{children}</div>}
                </div>
            </Label.Root>
        );
    }

    return (
        <Label.Root
            className={`${styles.labelRoot} ${isDisabled ? "bg-gray-100" : ""} ${cursorText ? "cursor-text" : ""}`}
            style={{
                transition: '0.5s',
                color: handleColorTag(),
                borderColor: isFocused ? '#374151' : '#D1D5DB',
                width: width ? width : '100%'
            }}
        >
            <div className={"flex gap-1 items-center"}>
                {title?.includes(':') ? title : title + ':'}
                {isBadge && badgeText ? (
                    <span className={`${badgeColor} text-xs font-medium px-1 py-0.5 rounded`}>
                        {badgeText}
                    </span>
                ) : null}
            </div>

            <div className={styles.inputTextContainer}>
                <input
                    ref={ref} // Usando a referência aqui
                    className={styles.inputText}
                    style={{margin: !notMargin ? "4px 0" : "0"}}
                    autoComplete="off"
                    onKeyPress={handleKeyPress}
                    {...rest}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {children && <div className={styles.inputIcon}>{children}</div>}
            </div>
        </Label.Root>
    );
});

export default InputTextRef;

interface CurrencyInputTextProps extends CurrencyInputProps {
    title: string;
    width?: string | number;
    children?: ReactNode;
    color?: InputTextColorEnum;
    isDisable?: boolean;
    isDark?: boolean;
}

export function CurrencyInputText({title, isDark, width, children, isDisable, color, ...rest}: CurrencyInputTextProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <Label.Root
            className={styles.labelRoot}
            style={{
                backgroundColor: isDisable ? "#f3f4f6" : "",
                transition: '0.5s',
                color: isFocused ? '#374151' : '#9CA3AF',
                borderColor: isFocused ? '#374151' : '#D1D5DB',
                width: width ? width : '100%'
            }}
        >
            {title.includes(':') ? title : title + ':'}

            <div className={styles.inputTextContainer}>
                <CurrencyInput
                    {...rest}
                    prefix={'R$ '}
                    id={title.toLowerCase().replace(/ /g, '')}
                    className={`${styles.inputText} ${isDark ? "text-white": "text-gray-700"}`}
                    autoComplete={'off'}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    decimalSeparator=","
                    groupSeparator="."
                    style={{
                        color: color
                    }}
                />

                {children &&
                    <div className={styles.inputIcon}>
                        {children}
                    </div>
                }
            </div>
        </Label.Root>
    );
}

