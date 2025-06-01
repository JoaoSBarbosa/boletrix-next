import * as Dialog from "@radix-ui/react-dialog";
import {ReactNode} from "react";
import styles from "./Modal.module.css";
import {X, XIcon} from "@phosphor-icons/react";
import {DialogProps} from "@radix-ui/react-dialog";

interface ModalProps extends DialogProps {
    title?: string;
    description?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    trigger?: React.ReactNode;
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
    minHeight?: string | number;
    idProps?: string;
    padding?: string;
}

export const Modal = ({
                          idProps,
                          minHeight,
                          maxHeight,
                          height,
                          width,
                          title,
                          description,
                          setOpen,
                          trigger,
                          open,
                          padding = "p-6",
                          children
                      }: ModalProps) => {

    const handleClose = () => {
        if (setOpen) {
            setOpen(false);
        }
    };
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/40 fixed inset-0 z-40" onClick={handleClose}/>
                <Dialog.Content
                    style={{
                        width: typeof width === "number" ? `${width}px` : width,
                        height: height ? height : '',
                        maxHeight: maxHeight ? maxHeight : '',
                        minHeight: minHeight ? minHeight : '',
                    }}
                    className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900  rounded-md shadow-lg ${padding}`}
                >
                    {title && (
                        <Dialog.Title className="text-lg font-semibold mb-2">
                            {title}
                        </Dialog.Title>
                    )}
                    {description && (
                        <Dialog.Description className="text-sm text-gray-500 mb-4">
                            {description}
                        </Dialog.Description>
                    )}

                    {/* Aqui vai o conteúdo customizável */}
                    {children}

                    <Dialog.Close asChild>
                        <button
                            id={idProps ? idProps : ""}
                            className={styles.closeButton}
                            aria-label="Fechar"
                            onClick={handleClose} // Chame a função handleClose quando o botão de fechar for clicado
                        >
                            <XIcon size={'60%'} weight={'bold'}/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
