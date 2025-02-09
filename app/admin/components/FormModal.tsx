import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: Record<string, any> | null;
    onSave: (updatedData: Record<string, any>) => void;
    title: string;
    isSaving: boolean;
    fieldConfig: { [key: string]: { disabled?: boolean; required?: boolean } };
    options: { [key: string]: string[] };
}

export default function GenericModal({
    isOpen,
    onClose,
    data,
    onSave,
    title,
    isSaving,
    fieldConfig,
    options,
}: FormModalProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        setFormData(data || {});
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
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
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                        <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="max-h-[60vh] overflow-y-auto px-2">
                                {Object.keys(formData).length > 0 ? (
                                    Object.keys(formData).map((key) => (
                                        <div key={key} className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </label>
                                            {options[key] ? (
                                                <select
                                                    id={key}
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    disabled={fieldConfig[key]?.disabled}
                                                    required={fieldConfig[key]?.required}
                                                >
                                                    {options[key].map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : typeof formData[key] === "boolean" ? (
                                                <input
                                                    type="checkbox"
                                                    id={key}
                                                    name={key}
                                                    checked={formData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    disabled={fieldConfig[key]?.disabled}
                                                    required={fieldConfig[key]?.required}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    id={key}
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    disabled={fieldConfig[key]?.disabled}
                                                    required={fieldConfig[key]?.required}
                                                />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">Cargando datos...</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Guardando..." : "Guardar"}
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
