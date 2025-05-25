import {toast} from "react-toastify";
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