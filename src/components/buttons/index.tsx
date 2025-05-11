export enum ButtonType {
    RESET = "reset",
    SUBMIT = "submit",
    BUTTON = "button"
}

interface ButtonProps {
    type: ButtonType;
    title?: string;
    value: string;
    onClick?: ()=> void;
}

export const Button = ({title, value, type = ButtonType.BUTTON, onClick}: ButtonProps) => {

    return (
        <button
            onClick={ onClick }
            title={title}
            type={type}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {value}
        </button>
    )
}