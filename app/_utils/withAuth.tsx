/** app/utils/withAuth.tsx */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRedirect } from "../_context/redirectContext";
import LoadingScreen from "../_components/LoadingScreen";

const withAuth = (WrappedComponent: React.ComponentType) => {

    const AuthComponent = (props: any) => { 
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const { setRedirecting } = useRedirect();

        useEffect(() => {
            const accessToken = Cookies.get('accessToken');
            setIsAuthenticated(!!accessToken);

            if (!accessToken) {
                setRedirecting(true);
                setTimeout(() => {
                    router.push('/home');
                    setRedirecting(false);
                }, 3000);
            }
        }, [router, setRedirecting]);

        return (
            <>
                {!isAuthenticated ? <LoadingScreen />: <WrappedComponent {...props} /> }                
            </>
        )
    };

    return AuthComponent;
};

export default withAuth;