import axios from 'axios';

async function handleLogin(email: string, password: string) {
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    try {
        const response = await axios.post(`${NEXT_PUBLIC_URL}/auth/jwt/create/`, {
            email,
            password,
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else if (error instanceof Error && error.message) {
            return { message: error.message };
        } else {
            return { message: 'An unexpected error occurred' };
        }
    }
}

export default handleLogin;