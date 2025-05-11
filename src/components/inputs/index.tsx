

export enum TypeInput {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email",
    NUMBER = "number",
    TEL = "tel",
    URL = "url",
    SEARCH = "search",
    DATE = "date",
    TIME = "time",
    DATETIME_LOCAL = "datetime-local",
    MONTH = "month",
    WEEK = "week",
    FILE = "file",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    RANGE = "range",
    COLOR = "color",
    HIDDEN = "hidden",
    SUBMIT = "submit",
    RESET = "reset",
    BUTTON = "button"
}

interface InputProps {
    label: string;
    placeholder: string;
    inputValue: string;
    onChange: (value: string) => void;
    htmlFor: string;
    type: TypeInput
}
export const Input = ({ label, placeholder, inputValue, onChange, htmlFor, type = TypeInput.TEXT}: InputProps) =>{
    return(
        <div>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                { label }
            </label>
            <input
                type={ type }
                name={htmlFor}
                id={htmlFor}
                value={ inputValue }
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""/>
        </div>
    )
}