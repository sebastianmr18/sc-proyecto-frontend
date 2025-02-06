import axios from 'axios';

export async function GET() {
    const courts = await getCourts();
    return new Response(JSON.stringify(courts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getCourts() {
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/courts/`);
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