import {ChangeEvent, useRef} from "react";

interface InputFileProps {
    fileName?: string;
    onChange: (file: File | null) => void;
}

export const InputFile = ({ fileName, onChange }: InputFileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        onChange(file);
    };

    return (
        <div className="flex flex-col items-start w-full">
            <label
                htmlFor="file_input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    Anexar arquivo{" "}
                    {fileName && (
                        <span className="text-red-600">
              (Substituirá o arquivo atual {fileName})
            </span>
                    )}
                </p>
            </label>
            <input
                id="file_input"
                ref={fileInputRef}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                PDF, PNG, JPG ou JPEG.
            </p>
        </div>
    );
};
