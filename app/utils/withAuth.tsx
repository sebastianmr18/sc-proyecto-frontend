/** app/utils/withAuth.tsx */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthComponent = (props: any) => { 
        const router = useRouter();
        const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default withAuth;