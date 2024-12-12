import axios from 'axios'

export async function GET(request: Request, {params}: {params: { court_id: any}}){
    const { court_id } = params

    if (!court_id) {
        return new Response(JSON.stringify({error: 'Court ID is required'}), {status: 400})
    }

    try {
        const court = await getCourt(court_id);
        return new Response(JSON.stringify(court), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch court' }), { status: 500 });
    }
}

async function getCourt(court_id: any) {
    console.log(court_id);
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/courts/${court_id}`);
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