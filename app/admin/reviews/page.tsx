
"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminContext from "@/app/_context/adminContext";
import toast, { Toaster } from "react-hot-toast";
import FormModal from '@/app/admin/components/FormModal';
import ConfirmModal from '@/app/admin/components/ConfirmModal';

interface Review {
    review_id: number,
    rating: number,
    review_date: string,
    user: number,
    court: number,
}

const AdminReviewsPage = () => {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState<Record<string, any> | Review | null>(null);
    const [fieldConfig, setFieldConfig] = useState<{ [key: string]: { disabled?: boolean; required?: boolean } }>({});
    const [isUpdating, setIsUpdating] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);

    const defaultReview = {
        review_id: 'ID AUTOMATICO',
        rating: 0,
        review_date: '',
        user: '',
        court: '',
    }

    const fieldOptions = {
        rating: ["1", "2", "3", "4", "5"],
    }

    const createFieldConfig = {
        review_id: {disabled: true, required: true},
        rating: {disabled: false, required: true},
        review_date: {disabled: false, required: true},
        user: {disabled: false, required: true},
        court: {disabled: false, required: true},
    }

    const updateFieldConfig = {
        review_id: {disabled: true, required: false},
        rating: {disabled: false, required: true},
        review_date: {disabled: false, required: true},
        user: {disabled: true, required: true},
        court: {disabled: true, required: true},
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/reviews");
            setReviews(response.data);
            console.log('Reviews fetched', response.data);
        } catch (error) {
            console.log('Error fetching reviews', error);
            toast.error("Error fetching reviews");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        setSelectedReview(defaultReview);
        setFieldConfig(createFieldConfig);
        setIsModalOpen(true);
        setIsUpdating(false);    
    };

    const handleUpdate = async (review_id: number) => {
        const review = reviews.find(review => review.review_id === review_id);
        if (review) {
            setSelectedReview(review);
            setFieldConfig(updateFieldConfig);
            setIsModalOpen(true);
            setIsUpdating(true);
        } else {
            toast.error("Reseña no encontrada");  
        }
    }

    const handleDelete = async (review_id: number) => {
        try {
            const response = await axios.delete(`/api/reviews?review_id=${review_id}`);
            if (response.data.status === 400) {
                toast.error(response.data.data);
            } else {                    
                toast.success('Reseña eliminada con éxito');
            }
            fetchReviews();                    
        } catch (error) {
            toast.error("Error al eliminar la reseña");
        }
    };

    const handleSave = async (data: any) => {
        setIsSaving(true);        
        try {
            if (isUpdating) {
                const response = await axios.put('/api/reviews', data);
                console.log('Response', response)
                if (response.data.status === 400) {
                    toast.error(response.data.data);
                } else {                    
                    toast.success('Reseña actualizada con éxito');
                }
            } else {
                const response = await axios.post('/api/reviews', data);
                console.log('Response', response)
                if (response.data.status === 400) {
                    toast.error(response.data.data);
                } else {                    
                    toast.success('Reseña creada con éxito');
                }
            }
            fetchReviews();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving review', error)
            toast.error('Error al guardar la reseña');
        } finally {
            setIsSaving(false);
        }
    }

    const openConfirmModal = (id: number) => {
        setReviewIdToDelete(id);
        setIsConfirmModalOpen(true);
    }

    const closeConfirmModal = () => {
        setReviewIdToDelete(null);
        setIsConfirmModalOpen(false);
    }

    const confirmDelete = () => {
        if (reviewIdToDelete !== null) {
            handleDelete(reviewIdToDelete)
        }
        closeConfirmModal();
    }

    return (
        <AdminContext>
            <Toaster />
            <div className="flex flex-col items-center h-screen bg-blue-400">
                <h1 className="text-4xl font-bold mt-20 mb-4">Administrar Reseñas</h1>
                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 h-[60vh] flex flex-col overflow-hidden">
                        <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
                        <div className="overflow-x-auto overflow-y-auto flex-grow">
                            <table className="w-full border-collapse min-w-max">
                                <thead>
                                    <tr>
                                        {reviews.length > 0 &&
                                            Object.keys(reviews[0]).map((key) => (
                                                <th key={key} className="border-b-2 p-2 text-left capitalize">
                                                    {key}
                                                </th>
                                            ))}
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <tr key={review.review_id}>
                                                {Object.entries(review).map(([key, value]) => (
                                                    <td key={`${review.review_id}-${key}`} className="border-b p-2">
                                                        {typeof value === 'string' || typeof value === 'number'
                                                            ? value
                                                            : JSON.stringify(value)}
                                                    </td>
                                                ))}
                                                <td key={`${review.review_id}-actions`} className="border-b p-2">
                                                    <button
                                                        onClick={() => handleUpdate(review.review_id)}
                                                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => openConfirmModal(review.review_id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={Object.keys(reviews[0] || {}).length + 1} className="text-center p-4">
                                                No hay datos disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <FormModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                data={selectedReview}                                
                                onSave={handleSave}
                                title={isUpdating ? "Editar Cancha" : "Crear Cancha"}
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
                                message="¿Está seguro de que desea eliminar esta cancha?"
                            />
                        </div>
                        <div className="mt-4">                            
                            <button disabled onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50">Agregar Reseña</button>
                        </div>
                    </div>
                )}
            </div>
        </AdminContext>
    );
};

export default AdminReviewsPage;
