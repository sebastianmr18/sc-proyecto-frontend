import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function POST(request: Request) {
    try {
        const reservationData = await request.json();

        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/reservations/`, reservationData, {
            headers: {
                'Content-Type': 'application/json',
            },
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

export async function GET() {
    try {        
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/reservations`);
        const reservations = response.data

        return new Response(JSON.stringify(reservations), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}