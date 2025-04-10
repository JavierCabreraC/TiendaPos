import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export const useAuth = (allowedRoles: string[]) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role'); // Obtenemos el rol guardado al hacer login

        if (!token || !userRole) {
            router.push('/');  // Si no hay token o rol, redirigir al login o home
            return;
        }

        if (!allowedRoles.includes(userRole)) {
            router.push('/');  // Si el rol no está permitido en esta ruta, redirige al inicio
            return;
        }

        setIsAuthenticated(true);  // Si el rol es correcto, permite acceso
        setLoading(false);
    }, [router, allowedRoles]);

    return { isAuthenticated, loading };
};
