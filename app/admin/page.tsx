"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/app/_utils/withAuth';
import AdminContext from '../_context/adminContext';

const AdminPage = () => {
    const router = useRouter();
    const models = ['users', 'courts', 'courtImages', 'reservations', 'payments', 'reviews'];

    const handleNavigation = (model: string) => {
        router.push(`/admin/${model}`);
    };

    return (
        <AdminContext>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white">
                <h1 className="text-5xl font-extrabold mb-8">Panel de Administración</h1>
                <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                    {models.map((model) => (
                        <button
                            key={model}
                            onClick={() => handleNavigation(model)}
                            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-100 transition-all"
                        >
                            {model.charAt(0).toUpperCase() + model.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </AdminContext>
    );
}

export default withAuth(AdminPage);