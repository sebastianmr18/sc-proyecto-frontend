import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function GET() {
    const users = await getUsers();
    return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(request: Request) {
    const data = await request.json();
    const user = await createUser(data);
    return new Response(JSON.stringify(user), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(request: Request) {
    const data = await request.json();
    console.log('Updating user with data', data);
    const updatedUser = await updateUser(data.user_id, data);
    return new Response(JSON.stringify(updatedUser), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get('user_id');
        if (!user_id) {
            return new NextResponse(JSON.stringify({ message: 'User ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        console.log('Deleting user with ID', user_id);
        const deletedUser = await deleteUser(Number(user_id));
        return new NextResponse(JSON.stringify(deletedUser), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return new NextResponse(JSON.stringify({ message: 'Error deleting user' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

async function getUsers() {
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/users/`);
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

async function createUser(data: any) {
    console.log('Creating user with data', data);
    try {
        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/users/`, data);
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

async function updateUser(user_id: number, data: any) {
    try {
        const response = await axios.put(`${NEXT_PUBLIC_URL}/api/users/${user_id}/`, data);
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

async function deleteUser(user_id: number) {
    try {
        const response = await axios.delete(`${NEXT_PUBLIC_URL}/api/users/${user_id}/`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            return {
                status: error.response.status,
                data: errorData,
            };
        } else if (error instanceof Error && error.message) {
            return { status: 500, data: { message: error.message } };
        } else {
            return { status: 500, data: { message: 'An unexpected error occurred' } };
        }
    }
}