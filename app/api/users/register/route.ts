//app/auth/users/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// Define el tipo para los datos de registro
interface RegisterData {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}

// Define el tipo de la respuesta que devuelve la función
interface RegisterResponse {
    status: number;
    data: any; 
}

async function handleRegister(data: RegisterData): Promise<RegisterResponse> {
    const URL = process.env.NEXT_PUBLIC_URL;
    try {
        const response = await axios.post(`${URL}/auth/users/`, data);
        return { status: 200, data: response.data };
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

// Usar la función handleRegister en la ruta POST de la API
export async function POST(req: NextRequest) {
    const body = await req.json();

    // Verifica que la solicitud contenga datos antes de procesarla
    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
            { message: 'Datos de registro incompletos' },
            { status: 400 }
        );
    }

    const result = await handleRegister(body);

    // Si la respuesta es exitosa, devolvemos la data
    if (result.status === 200) {
        return NextResponse.json(result.data, { status: 200 });
    }

    // Si hubo un error, devolvemos el error
    return NextResponse.json(result.data, { status: result.status });
}