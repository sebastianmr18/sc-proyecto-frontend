"use client"
import React, { useState, useEffect } from 'react';
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
    const [court, setCourt] = useState<any>(null);

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
        <div className="container mx-auto p-4">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Califica tu experiencia en nuestras canchas!</h1>
            <div className="mb-6">
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating (de 1 a 5)</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                        <label className="block text-sm font-medium text-gray-700">Comentarios adicionales</label>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            rows={4}
                            disabled={isSubmitting}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        Subir
                    </button>
                </form>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                <button 
                    onClick={handleLoadReviews} 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled={reviewsLoaded}>
                    Cargar reviews
                </button>
                {reviewsLoaded && reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet. Be the first to write a review!</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.review_id} className="bg-white p-4 rounded-lg shadow-md">                                
                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-500">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </span>
                                    <span className="ml-2 text-gray-600">{review.rating} / 5</span>
                                </div>                                
                                <p className="text-gray-600">
                                    <strong>Fecha:</strong> {new Date(review.review_date).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </p>
                                <p className="text-gray-600"><strong>Comentario:</strong> {review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default withAuth(ReviewCourtPage);