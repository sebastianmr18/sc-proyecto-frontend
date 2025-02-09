"use client"
import React, { useState } from 'react';
import axios from 'axios';
import withAuth from '@/app/_utils/withAuth';
import { useAuth } from '@/app/_context/authContext';
import toast, { Toaster } from 'react-hot-toast';

const ReviewCourtPage = ({ params }: { params: { court_id: any } }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const fetchReviews = async () => {
        try {
            setReviews([]);
            const response = await axios.get(`/api/reviews/`);
            const reviews = response.data;
            reviews.forEach((review: any) => {
                if (review.court.toString() === params.court_id) {
                    setReviews((prevReviews) => [...prevReviews, review]);
                }
            });
            setReviewsLoaded(true);
            console.log("Reviews:", reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const review_data = {
            rating: rating,
            comment: newReview,
            user: user?.user_id,
            court: params.court_id
        }
        console.log("Review data:", review_data);

        try {
            const response = await axios.post(`/api/reviews/`, review_data);
            console.log("Review submitted:", response.data);
            toast.success("Review subida exitosamente!");
            setTimeout(() => {
                location.reload();
            }, 1500)
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Hubo un error al subir la review");
        }
        setIsSubmitting(false);
    }

    const handleLoadReviews = async () => {
        await fetchReviews();
    }

    return (
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 p-8'>
            <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-8">
                <Toaster />
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Califica tu experiencia</h1>
                <p className="text-gray-600 text-center mb-8">¡Queremos saber tu opinión sobre nuestras canchas!</p>
        
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Calificación (1 a 5)
                            </label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={isSubmitting}
                            >
                                <option value={0}>Selecciona una calificación</option>
                                <option value={1}>1 - Muy mala</option>
                                <option value={2}>2 - Mala</option>
                                <option value={3}>3 - Regular</option>
                                <option value={4}>4 - Buena</option>
                                <option value={5}>5 - Excelente</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Comentarios adicionales
                            </label>
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                                placeholder="Escribe tus comentarios aquí..."
                                disabled={isSubmitting}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Subiendo...' : 'Subir calificación'}
                        </button>
                    </form>
                </div>
        
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Reseñas</h2>
                    <button
                        onClick={handleLoadReviews}
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed mb-6"
                        disabled={reviewsLoaded}
                    >
                        {reviewsLoaded ? 'Cargado' : 'Cargar reseñas'}
                    </button>
        
                    {reviewsLoaded && reviews.length === 0 ? (
                        <p className="text-gray-600 text-center">
                            Aún no hay reseñas. ¡Sé el primero en calificar!
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div
                                    key={review.review_id}
                                    className="bg-white p-6 rounded-lg shadow-md"
                                >
                                    <div className="flex items-center mb-3">
                                        <span className="text-yellow-400 text-lg">
                                            {'★'.repeat(review.rating)}
                                            {'☆'.repeat(5 - review.rating)}
                                        </span>
                                        <span className="ml-3 text-gray-600">
                                            {review.rating} / 5
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        <strong>Fecha:</strong>{' '}
                                        {new Date(review.review_date).toLocaleDateString(
                                            'es-ES',
                                            {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            }
                                        )}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <strong>Comentario:</strong> {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default withAuth(ReviewCourtPage);