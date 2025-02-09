import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export default function GenericModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: ConfirmModalProps) {
    if (!isOpen) return null;
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                        <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-600 mb-4">
                            {message}
                        </Dialog.Description>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onConfirm}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancelar
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
