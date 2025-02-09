import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const payments = await getPayments();
    return new Response(JSON.stringify(payments), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

async function getPayments() {
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/payments/`);
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

export async function POST(request: Request) {
    try {
        const paymentData = await request.json();
        console.log("Datos recibidos en la API de Next.js:", paymentData);

        const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/payments/`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Error al hacer la solicitud al backend:", error);
        return NextResponse.json(
            { message: "Hubo un error al procesar la reserva" },
            { status: 500 }
        );
    }
}