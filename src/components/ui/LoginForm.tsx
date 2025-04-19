'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/services/index.services';
import { Button, Input } from '@/components/ui/index.ui';
import { Card, CardHeader, CardContent } from '@/components/ui/card';


interface LoginResponse {
    access_token: string;
    rol: 'admin' | 'almacenista';
}

interface LoginErrorResponse {
    message: string;
}

interface LoginFormProps {
    onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(API_CONFIG.ENDPOINTS.AUTH_LOGIN, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
          
            if (!response.ok) {
                const errorData: LoginErrorResponse = await response.json();
                setError(errorData.message || 'Datos incorrectos. Intente de nuevo.');  // mostrar el mensaje del backend
                return;
            }
          
            const data: LoginResponse = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.rol);
          
            switch (data.rol) {
                case 'admin':
                    router.push('/admin/dashboard');
                    break;
                case 'almacenista':
                    router.push('/almacen/dashboard');
                    break;
                default:
                    setError('Rol no válido');
            }
        } catch (err) {
            setError(`Login failed: ${err instanceof Error ? err.message : 'Error Desconocido. Rol no válido.'}`);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
                <Button variant="ghost" onClick={onClose}>X</Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingrese su correo electrónico"
                            className="mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese su contraseña"
                            className="mt-1"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full">Iniciar Sesión</Button>
                </form>
            </CardContent>
        </Card>
    );
};
