import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export const useAuth = (allowedRoles: ('admin' | 'almacenista' | 'cliente')[]) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (!token || !userRole) {
            router.push('/');
            return;
        }

        if (!allowedRoles.includes(userRole as 'admin' | 'almacenista' | 'cliente')) {
            router.push('/');
            return;
        }

        setIsAuthenticated(true);
        setLoading(false);
    }, [router, allowedRoles]);

    return { isAuthenticated, loading };
};
