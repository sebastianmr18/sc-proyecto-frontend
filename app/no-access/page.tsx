import React from 'react';

export default function NoAccessPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-400 text-white">
            <h1 className="text-4xl font-bold">No tienes acceso</h1>
            <p className="mt-4">Lo sentimos, pero no tienes permiso para acceder a esta página.</p>
        </div>
    );
};