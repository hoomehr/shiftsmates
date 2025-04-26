"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Suppress NextAuth client fetch errors in console
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filter out NextAuth client fetch errors
      if (typeof args[0] === 'string' && 
          (args[0].includes('[next-auth][error][CLIENT_FETCH_ERROR]') ||
           args[0].includes('Unexpected token'))) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
