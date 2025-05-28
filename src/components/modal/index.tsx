import * as Dialog from "@radix-ui/react-dialog";
import {ReactNode} from "react";
import styles from "./Modal.module.css";
import {X} from "@phosphor-icons/react";

interface ModalProps {
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
                        width: width,
                        height: height ? height : '',
                        maxHeight: maxHeight ? maxHeight : '',
                        minHeight: minHeight ? minHeight : '',
                    }}
                    className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-6 rounded-md shadow-lg"
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
                            <X size={'60%'} weight={'bold'}/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
