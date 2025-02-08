"use client"
import React, { useState, useEffect, useActionState } from "react"
import axios from "axios"
import AdminContext from "@/app/_context/adminContext"
import toast, { Toaster } from "react-hot-toast"
import FormModal from '@/app/admin/components/FormModal';
import ConfirmModal from '@/app/admin/components/ConfirmModal';

interface Court {
    court_id: number,
    name: string,
    location: string,
    surface_Type: string,
    hourly_rate: number,
    availability: string,
    capacity: number,
    has_active_promotion: boolean,
    sport: string
}

const AdminCourtsPage = () => {
    const [loading, setLoading] = useState(true)
    const [courts, setCourts] = useState<Court[]>([])
    const [selectedCourt, setSelectedCourt] = useState<Record<string, any> | Court | null>(null);
    const [fieldConfig, setFieldConfig] = useState<{ [key: string]: { disabled?: boolean; required?: boolean } }>({});
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [courtIdToDelete, setCourtIdToDelete] = useState<number | null>(null);

    const defaultCourt = {
        court_id: "ID AUTOMATICO",
        name: "",
        location: "",
        surface_type: "",
        hourly_rate: 0,
        availability: "",
        capacity: 0,
        has_active_promotion: false,
        sport: ""
    }

    const fieldOptions = {
        surface_type: ["pasto", "arena", "arcilla", "ladrillo"],
        has_active_promotion: ["true", "false"],
        sport: ["futbol", "voleibol", "tenis", "otro"]
    }

    const createFieldConfig = {
        court_id: {disabled: true, required: true},
        name: {disabled: false, required: true},
        location: {disabled: false, required: true},
        surface_type: {disabled: false, required: true},
        hourly_rate: {disabled: false, required: true},
        availability: {disabled: false, required: true},
        capacity: {disabled: false, required: true},
        has_active_promotion: {disabled: false, required: true},
        sport: {disabled: false, required: true}
    }

    const updateFieldConfig = {
        court_id: {disabled: true, required: false},
        name: {disabled: false, required: true},
        location: {disabled: false, required: true},
        surface_type: {disabled: false, required: true},
        hourly_rate: {disabled: false, required: true},
        availability: {disabled: false, required: true},
        capacity: {disabled: false, required: true},
        has_active_promotion: {disabled: false, required: true},
        sport: {disabled: false, required: true}
    }

    useEffect(() => {
        fetchCourts();
    }, [])

    const fetchCourts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/courts");
            setCourts(response.data);
            console.log('Courts fetched', response.data);
        } catch (error) {
            console.log('Error fetching courts', error);
            toast.error("Error fetching courts");
        } finally {
            setLoading(false);
        }
    }

    const handleCreate = () => {
        setSelectedCourt(defaultCourt);
        setFieldConfig(createFieldConfig);
        setIsModalOpen(true);
        setIsUpdating(false);
    }

    const handleUpdate = (id: number) => {
        const court = courts.find(court => court.court_id === id);
        if (court) {
            setSelectedCourt(court);            
        } else {
            toast.error("Court not found");
        }
        setFieldConfig(updateFieldConfig);
        console.log('Selected court', court);
        setIsModalOpen(true);
        setIsUpdating(true)
    }

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(`/api/courts?court_id=${id}`)
            console.log('Response', response);
            if (response.data.status === 400) {
                toast.error(response.data.data);
            } else {                    
                toast.success('Cancha eliminada con éxito');
            }
            fetchCourts();
        } catch (error) {
            console.error('Error deleting court', error);
            toast.error('Error al eliminar la cancha')
        }
    }

    const handleSave = async (data: any) => {
        setIsSaving(true);        
        try {
            if (isUpdating) {
                const response = await axios.put('/api/courts', data);
                console.log('Response', response)
                if (response.data.status === 400) {
                    toast.error(response.data.data);
                } else {                    
                    toast.success('Cancha actualizada con éxito');
                }
            } else {
                const response = await axios.post('/api/courts', data);
                console.log('Response', response)
                if (response.data.status === 400) {
                    toast.error(response.data.data);
                } else {                    
                    toast.success('Cancha creada con éxito');
                }
            }
            fetchCourts();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving court', error)
            toast.error('Error al guardar la cancha');
        } finally {
            setIsSaving(false);
        }
    }

    const openConfirmModal = (id: number) => {
        setCourtIdToDelete(id);
        setIsConfirmModalOpen(true);
    }

    const closeConfirmModal = () => {
        setCourtIdToDelete(null);
        setIsConfirmModalOpen(false);
    }

    const confirmDelete = () => {
        if (courtIdToDelete !== null) {
            handleDelete(courtIdToDelete)
        }
        closeConfirmModal();
    }

    return (
        <AdminContext>
            <Toaster />
            <div className="flex flex-col items-center h-screen bg-blue-400">
                <h1 className="text-4xl font-bold mt-20 mb-4">Administrar Canchas</h1>
                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 h-[60vh] flex flex-col overflow-hidden">
                        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
                        <div className="overflow-x-auto overflow-y-auto flex-grow">
                            <table className="w-full border-collapse min-w-max">
                                <thead>
                                    <tr>
                                        {courts.length > 0 &&
                                            Object.keys(courts[0]).map((key) => (
                                                <th key={key} className="border-b-2 p-2 text-left capitalize">
                                                    {key}
                                                </th>
                                            ))}
                                        <th className="border-b-2 p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courts.length > 0 ? (
                                        courts.map((court) => (
                                            <tr key={court.court_id}>
                                                {Object.entries(court).map(([key, value]) => (
                                                    <td key={`${court.court_id}-${key}`} className="border-b p-2">
                                                        {typeof value === 'string' || typeof value === 'number'
                                                            ? value
                                                            : JSON.stringify(value)}
                                                    </td>
                                                ))}
                                                <td key={`${court.court_id}-actions`} className="border-b p-2">
                                                    <button
                                                        onClick={() => handleUpdate(court.court_id)}
                                                        className="text-blue-600 hover:underline mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => openConfirmModal(court.court_id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={Object.keys(courts[0] || {}).length + 1} className="text-center p-4">
                                                No hay datos disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {/* Modal de edición */}
                            <FormModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                data={selectedCourt}                                
                                onSave={handleSave}
                                title={isUpdating ? "Editar Usuario" : "Crear Usuario"}
                                isSaving={isSaving}
                                fieldConfig={fieldConfig}
                                options={fieldOptions}
                            />
                            { /* Modal de confirmación */}
                            <ConfirmModal
                                isOpen={isConfirmModalOpen}
                                onClose={closeConfirmModal}
                                onConfirm={confirmDelete}
                                title="Confirmar eliminación"
                                message="¿Está seguro de que desea eliminar este usuario?"
                            />
                        </div>
                        <button
                            onClick={handleCreate}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg self-start disabled:opacity-50"
                        >
                            Crear Nuevo
                        </button>
                    </div>
                )}
            </div>
        </AdminContext>
    )
}

export default AdminCourtsPage;