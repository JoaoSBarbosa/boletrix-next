import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
    title?: string;
    description?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    trigger?: React.ReactNode;
}

export const Modal = ({ title, description, setOpen, trigger, open, children }: ModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                { trigger }
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/40 fixed inset-0 z-40" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-6 rounded-md shadow-lg w-full max-w-md">
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
                            className="mt-4 inline-block text-sm text-gray-600 hover:underline"
                            onClick={() => setOpen(false)}
                        >
                            Fechar
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
