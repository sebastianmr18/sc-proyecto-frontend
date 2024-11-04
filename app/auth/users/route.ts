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
            return { status: error.response.status, data: error.response.data };
        } else if (error instanceof Error && error.message) {
            return { status: 500, data: { message: error.message } };
        } else {
            return { status: 500, data: { message: 'An unexpected error occurred' } };
        }
    }
}

// Usar la función handleRegister en la ruta POST de la API
export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = await handleRegister(body);
    return NextResponse.json(result.data, { status: result.status });
}
