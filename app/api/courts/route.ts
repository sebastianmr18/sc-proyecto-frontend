import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function GET() {
    const courts = await getCourts();
    return new Response(JSON.stringify(courts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(request: Request) {
    const data = await request.json()
    console.log('Updating court with data', data);
    const updatedCourt = await updateCourt(data.court_id, data);
    return new Response(JSON.stringify(updatedCourt), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(request: Request) {
    const data = await request.json();
    const court = await createCourt(data);
    return new Response(JSON.stringify(court), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const court_id = searchParams.get('court_id');
        if (!court_id) {
            return new NextResponse(JSON.stringify({ message: 'User ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        console.log('Deleting court with ID', court_id);
        const deletedCourt = await deleteCourt(Number(court_id));
        return new NextResponse(JSON.stringify(deletedCourt), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error deleting court:', error);
        return new NextResponse(JSON.stringify({ message: 'Error deleting court' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const getCourts = async () => {
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/courts/`);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

const createCourt = async (data: any) => {
    try {
        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/courts/`, data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

const updateCourt = async (court_id: number, data: any) => {
    try {
        const response = await axios.put(`${NEXT_PUBLIC_URL}/api/courts/${court_id}/`, data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

const deleteCourt = async (court_id: number) => {
    try {
        const response = await axios.delete(`${NEXT_PUBLIC_URL}/api/courts/${court_id}/`);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        return {
            status: error.response.status,
            data: error.response.data,
        };
    } else if (error instanceof Error && error.message) {
        return { status: 500, data: { message: error.message } };
    } else {
        return { status: 500, data: { message: 'An unexpected error occurred' } };
    }
};