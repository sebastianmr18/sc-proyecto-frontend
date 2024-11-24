"use client";

import React, { createContext, useContext, useState } from "react";

interface RedirectContextType {
    isRedirecting: boolean;
    setRedirecting: (state: boolean) => void;
}

const RedirectContext = createContext<RedirectContextType | undefined>(undefined);

export const RedirectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRedirecting, setRedirecting] = useState(false);

    return (
        <RedirectContext.Provider value={{ isRedirecting, setRedirecting }}>
            {children}
        </RedirectContext.Provider>
    );
};

export const useRedirect = () => {
    const context = useContext(RedirectContext);
    if (!context) {
        throw new Error("useRedirect must be used within a RedirectProvider");
    }
    return context;
};