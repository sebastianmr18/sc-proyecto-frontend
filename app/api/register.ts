import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    if (req.method === 'POST') {
        const { user_id, first_name, last_name, email, password } = req.body;
        try {
            const response = await axios.post(
                `${apiURL}/register/`, req.body
            );
            res.status(200).json(response.data);
        } catch (error: any) {
            // Verifica si error.response existe antes de acceder a sus datos
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else if (error.request) {
                // Si no se recibe respuesta del servidor
                res.status(500).json({ message: 'No response from the backend' });
            } else {
                // Si ocurre un error diferente (configuración, etc.)
                res.status(500).json({ message: error.message });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Request not allowed' });
    }
}