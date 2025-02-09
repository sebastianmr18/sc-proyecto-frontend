import axios from 'axios'
import { NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function GET(){
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/reviews`);
        const reviews = response.data

        return new Response(JSON.stringify(reviews), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log("Error fetching reviews:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },});
    }
}

export async function POST(request: Request) {
    try {
        const reviewData = await request.json();

        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/reviews/`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json(
            { message: "There was an error submitting the review" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    const data = await request.json();
    console.log('Updating review with data', data);
    const updatedReview = await updateReview(data.review_id, data);
    return new Response(JSON.stringify(updatedReview), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const review_id = searchParams.get('review_id');
        if (!review_id) {
            return new Response(JSON.stringify({ message: 'Review ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        console.log('Deleting review with ID', review_id);
        const deletedReview = await deleteReview(Number(review_id));
        return new Response(JSON.stringify(deletedReview), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return new Response(JSON.stringify({ message: 'Error deleting review' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

async function updateReview(review_id: number, data: any) {
    try {
        const response = await axios.put(`${NEXT_PUBLIC_URL}/api/reviews/${review_id}/`, data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            // Si el error es una respuesta del servidor, extraemos la información de la respuesta
            const errorData = error.response.data;
            return {
                status: error.response.status,
                data: errorData,
            };
        } else if (error instanceof Error && error.message) {
            // Si es un error estándar de JavaScript
            return { status: 500, data: { message: error.message } };
        } else {
            // Si ocurre un error inesperado, devolvemos un mensaje genérico
            return { status: 500, data: { message: 'An unexpected error occurred' } };
        }
    }
}

async function deleteReview(review_id: number) {
    try {
        const response = await axios.delete(`${NEXT_PUBLIC_URL}/api/reviews/${review_id}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            // Si el error es una respuesta del servidor, extraemos la información de la respuesta
            const errorData = error.response.data;
            return {
                status: error.response.status,
                data: errorData,
            };
        } else if (error instanceof Error && error.message) {
            // Si es un error estándar de JavaScript
            return { status: 500, data: { message: error.message } };
        } else {
            // Si ocurre un error inesperado, devolvemos un mensaje genérico
            return { status: 500, data: { message: 'An unexpected error occurred' } };
        }
    }
}