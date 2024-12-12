import { NextResponse } from 'next/server';
import axios from 'axios';

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