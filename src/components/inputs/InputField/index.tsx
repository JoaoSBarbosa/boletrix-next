import React from "react";

interface InputFieldProps {
    label: string;
    value: string | number | undefined;
    labelSize?: LabelSizeInputFiel; // Tamanho do texto do label
    valueSize?: ValueSizeInputFiel;
    labelColor?: LabelColorInputFiel; // Cor do texto do label
    valueColor?: ValueColorInputFiel; // Cor do texto do value
    borderColor?: BorderColorInputFiel; // Cor da borda
    borderWidth?: BorderWidthInputFiel; // Espessura da borda
    width?: WidthInputFiel; // Largura do campo
}

export enum LabelSizeInputFiel {
    Small = "text-[9px]",
    Medium = "text-sm",
    Large = "text-base",
}

export enum ValueSizeInputFiel {
    Small = "text-[12px]",
    Medium = "text-sm",
    Large = "text-base",
}
export enum LabelColorInputFiel {
    Gray = "text-gray-500",
    Red = "text-red-500",
    Blue = "text-blue-500",
    Green = "text-green-500",
}

export enum ValueColorInputFiel {
    Dark = "text-gray-800",
    Light = "text-gray-400",
    Primary = "text-blue-600",
    Secondary = "text-green-600", // Cor secundária (verde)
    Warning = "text-yellow-600",  // Cor de alerta/aviso (amarelo)
    Error = "text-red-600 font-bold",      // Cor de erro (vermelho)
    Success = "text-teal-600",   // Cor de sucesso (verde-azulado)
    Info = "text-indigo-600",    // Cor de informação (azul-índigo)
    Neutral = "text-neutral-600",// Cor neutra
    Accent = "text-pink-600",    // Cor de destaque (rosa)
}


export enum BorderColorInputFiel {
    Gray = "border-gray-300",
    Blue = "border-blue-600",
    Green = "border-green-500",
    Red = "border-red-500",
}

export enum BorderWidthInputFiel {
    Thin = "border-b",
    Medium = "border-2",
    Thick = "border-4",
}

export enum WidthInputFiel {
    Full = "w-full",
    Half = "w-1/2",
    Quarter = "w-1/4",
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   value,
                                                   labelSize = LabelSizeInputFiel.Small,
                                                   valueSize = ValueSizeInputFiel.Small,
                                                   labelColor = LabelColorInputFiel.Gray,
                                                   valueColor = ValueColorInputFiel.Dark,
                                                   borderColor = BorderColorInputFiel.Gray,
                                                   borderWidth = BorderWidthInputFiel.Thin,
                                                   width = WidthInputFiel.Full,
                                               }) => {
    return (
        <div className={`${width} h-max flex flex-col gap-1 `}>
            <label className={`${labelSize} ${labelColor}`}>
                {label}
            </label>
            <input
                className={`
                h-2 py-2 px-0 m-0 border-0
                ${valueSize}
                ${borderWidth} 
                ${borderColor}
                appearance-none 
                ${valueColor} focus:outline-none focus:ring-0`}
                type="text"
                value={value}
                readOnly
            />
        </div>
    );
};

export default InputField;
