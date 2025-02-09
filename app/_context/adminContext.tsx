import React from 'react';
import { useAuth } from '@/app/_context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (!isAdmin) {
            router.push('/no-access');
        }
    }, [isAuthenticated, isAdmin, router]);

    if (!isAuthenticated || !isAdmin) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
};

export default AdminContext;