// app/utils/withAuthRedirect.tsx
import { useAuth } from '@/app/_context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/app/_components/LoadingScreen';

// Esta función envuelve el componente y redirige si el usuario ya está autenticado
export const withAuthRedirect = (Component: React.FC) => {
    return (props: any) => {
        const { isAuthenticated, isLoading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isLoading && isAuthenticated) {
                // Redirigir al home si el usuario está autenticado
                router.push('/');
            }
        }, [isAuthenticated, isLoading, router]);

        if (isLoading) {
            return <LoadingScreen/>;
        }

        return !isAuthenticated ? <Component {...props} /> : null;
    };
};
