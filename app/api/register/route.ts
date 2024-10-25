import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// Función reutilizable para manejar el registro
async function handleRegister(data: any) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await axios.post(`${apiURL}/register/`, data);
        return { status: 200, data: response.data };
    } catch (error: any) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };
        } else if (error.request) {
            return { status: 500, data: { message: 'No response from the backend' } };
        } else {
            return { status: 500, data: { message: error.message } };
        }
    }
}

// Usar la función handleRegister en la ruta POST de la API
export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = await handleRegister(body);
    return NextResponse.json(result.data, { status: result.status });
}
