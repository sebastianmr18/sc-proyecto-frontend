// app/utils/withAuthRedirect.tsx
"use client";
import { useAuth } from '@/app/_context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withAuthRedirect = (Component: React.FC) => {
    const AuthComponent = (props: any) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated) {
                // Redirigir al home si el usuario está autenticado
                router.push('/');
            }
        }, [isAuthenticated, router]);

        return !isAuthenticated ? <Component {...props} /> : null;
    };

    // Establecer un nombre de visualización para el componente
    AuthComponent.displayName = `withAuthRedirect(${Component.displayName || Component.name || 'Component'})`;

    return AuthComponent;
};

