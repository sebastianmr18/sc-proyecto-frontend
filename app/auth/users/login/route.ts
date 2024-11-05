import { NextRequest, NextResponse } from 'next/server';
import handleLogin from '@/app/auth/users/login/handleLogin';

// Usar la función handleLogin en la ruta POST de la API
export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = await handleLogin(body.email, body.password);
    return NextResponse.json(result, { status: 200 });
}   