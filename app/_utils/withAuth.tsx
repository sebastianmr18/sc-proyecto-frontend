/** app/utils/withAuth.tsx */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthComponent = (props: any) => { 
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const accessToken = localStorage.getItem('accessToken');
            setIsAuthenticated(!!accessToken);

            if (!accessToken) {
                router.push('/login');
            }
        }, [router]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default withAuth;