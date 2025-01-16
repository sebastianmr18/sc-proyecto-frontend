import axios from 'axios'
import { NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function GET(){
    try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}/api/reviews`);
        const reviews = response.data

        return new Response(JSON.stringify(reviews), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log("Error fetching reviews:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },});
    }
}

export async function POST(request: Request) {
    try {
        const reviewData = await request.json();

        const response = await axios.post(`${NEXT_PUBLIC_URL}/api/reviews/`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json(
            { message: "There was an error submitting the review" },
            { status: 500 }
        );
    }
}