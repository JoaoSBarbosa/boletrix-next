import {toast} from "react-toastify";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import {StatusType} from "@/types/InstallmentResponseType";

interface ShowToastMessageProps {
    type: 'info' | 'warning' | 'error' | 'success' | 'dark' | 'warn',
    message: string;
}

export function showToastMessage({type, message}: ShowToastMessageProps) {
    switch (type) {
        case "info":
            toast.info(message);
            break;

        case "warning":
            toast.warning(message);
            break;

        case "error":
            toast.error(message);
            break;

        case "success":
            toast.success(message);
            break;
        case  "dark":
            toast.dark(message)
            break;
    }
}


export const formatedDate = (date: string) => {
    if (!date) return "";
    return format(parseISO(date), 'dd/MM/yyyy', {locale: ptBR})
}

export function recalculateHeightComponent(width: number, componentHeight: string | number | undefined) {
    let heightToCalculate: any;
    let suffix: string = '';
    if (componentHeight === undefined) {
        return
    }

    if (typeof componentHeight as string) {
        heightToCalculate = Number(String(componentHeight).replace('vh', '').replace('px', ''));

        if (String(componentHeight).includes('px'))
            suffix = 'px';

        if (String(componentHeight).includes('vh'))
            suffix = 'vh';
    } else
        heightToCalculate = componentHeight as number;

    if (width <= 1400)
        heightToCalculate = heightToCalculate - (heightToCalculate * 0.1);

    if (suffix)
        return heightToCalculate + suffix;
    else
        return heightToCalculate;
}

export const cardStatus = (status: StatusType) =>{
    if ( status === "" ) return "-";

    let bgCard;
    let textColor;
    let textValue;

    switch (status){

        case "PENDING":
            bgCard = "bg-red-100";
            textColor = "text-red-800";
            textValue = "Pendente";
            break;
        case "PAID":
            bgCard = "bg-green-100";
            textColor = "text-green-800";
            textValue = "Pago";
            break;
        case "WAITING":
            bgCard = "bg-yellow-100";
            textColor = "text-yellow-800";
            textValue = "Aguardando";
            break;
        default:
            bgCard = "bg-gray-100";
            textColor = "text-gray-800";
            textValue = "Desconhecido";
    }

    return (
        <span className={`inline-flex p-1 rounded-md  ${bgCard} ${textColor}`}>{textValue}</span>
    )
}