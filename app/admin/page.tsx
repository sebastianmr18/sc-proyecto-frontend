"use client"
import { useState, useEffect } from "react";

export default function AdminPage() {
    const [models, setModels] = useState({
        users: [],
        courts: [],
        courtImages: [],
        reservations: [],
        payments: [],
        reviews: [],
    });

    const [selectedModel, setSelectedModel] = useState<keyof typeof models>("users");

    useEffect(() => {
        // Simulación de datos
        setModels({
            users: [
                { id: 1, name: "Usuario 1" },
                { id: 2, name: "Usuario 2" },
            ],
            courts: [
                { id: 1, name: "Cancha 1" },
                { id: 2, name: "Cancha 2" },
            ],
            courtImages: [
                { id: 1, url: "https://via.placeholder.com/150" },
                { id: 2, url: "https://via.placeholder.com/150" },
            ],
            reservations: [
                { id: 1, user: "Usuario 1" },
                { id: 2, user: "Usuario 2" },
            ],
            payments: [
                { id: 1, user: "Usuario 1" },
                { id: 2, user: "Usuario 2" },
            ],
            reviews: [
                { id: 1, user: "Usuario 1", review: "Excelente servicio" },
                { id: 2, user: "Usuario 2", review: "Muy buena atención" },
            ],
        });
    }, []);

    const handleCreate = () => alert(`Crear nuevo en ${selectedModel}`);
    const handleUpdate = (id: number) => alert(`Editar ${selectedModel} con ID ${id}`);
    const handleDelete = (id: number) => alert(`Eliminar ${selectedModel} con ID ${id}`);

    return (
        <div className="flex flex-col items-center h-screen bg-blue-400">
            <h1 className="text-4xl font-bold mt-20 mb-4">Panel de Administración</h1>
            <div className="flex space-x-4 mb-6">
                {Object.keys(models).map((model) => (
                    <button
                        key={model}
                        onClick={() => setSelectedModel(model as keyof typeof models)}
                        className={`px-4 py-2 rounded-lg ${
                            selectedModel === model
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {model.charAt(0).toUpperCase() + model.slice(1)}
                    </button>
                ))}
            </div>
            <ModelTable
                model={selectedModel}
                data={models[selectedModel]}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

interface ModelTableProps {
    model: string;
    data: any[];
    onCreate: () => void;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}

function ModelTable({ model, data, onCreate, onUpdate, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-3/4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{model.charAt(0).toUpperCase() + model.slice(1)}</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        {data.length > 0 &&
                            Object.keys(data[0]).map((key) => (
                                <th key={key} className="border-b-2 p-2 text-left capitalize text-gray-700">
                                    {key}
                                </th>
                            ))}
                        <th className="border-b-2 p-2 text-left text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100 transition-colors">
                                {Object.values(item).map((value, index) => (
                                    <td key={index} className="border-b p-2 text-gray-800">
                                        {typeof value === "string" ? value : JSON.stringify(value)}
                                    </td>
                                ))}
                                <td className="border-b p-2">
                                    <button
                                        onClick={() => onUpdate(item.id)}
                                        className="text-blue-600 hover:underline mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(data[0] || {}).length + 1} className="text-center p-4 text-gray-500">
                                No hay datos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                onClick={onCreate}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
                Crear Nuevo
            </button>
        </div>
    );
}
