import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

interface FormModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    data: Record<string, any> | null;
    onSave: (updatedData: Record<string, any>) => void;
    title: string;
    isSaving: boolean;
    fieldConfig: { [key: string]: { disabled?: boolean; required?: boolean } };
}

export default function GenericModal<T extends Record<string, any>>({
    isOpen,
    onClose,
    data,
    onSave,
    title,
    isSaving,
    fieldConfig,
}: FormModalProps<T>) {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        setFormData(data || {}); // Actualiza los datos cuando cambia el modelo
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Dialog.Panel
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl"
                    >
                        <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Contenedor con scroll si hay muchos campos */}
                            <div className="max-h-[60vh] overflow-y-auto px-2">
                                {Object.keys(formData).length > 0 ? (
                                    Object.keys(formData).map((key) => (
                                        <div key={key} className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                                {key}
                                            </label>
                                            <input
                                                type="text"
                                                name={key}
                                                value={formData[key] !== undefined ? String(formData[key]) : ""}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                disabled={fieldConfig[key]?.disabled}
                                                required={fieldConfig[key]?.required}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">Cargando datos...</p>
                                )}
                            </div>

                            {/* Botones siempre visibles */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
