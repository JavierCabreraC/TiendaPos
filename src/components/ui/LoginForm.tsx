'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/services/index.services';
import { Button, Input } from '@/components/ui/index.ui';
import { Card, CardHeader, CardContent } from '@/components/ui/card';



interface LoginResponse {
    access_token: string;
    refresh: string;
    rol: 'admin' | 'almacenista' | 'cliente';
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
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
          
            if (!response.ok) {
                const errorData: LoginErrorResponse = await response.json();
                setError(errorData.message || 'Datos incorrectos. Intente de nuevo.');
                return;
            }
          
            const data: LoginResponse = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('role', data.rol);
          
            switch (data.rol) {
                case 'admin':
                    router.push('/admin/adminDashboard');
                    break;
                case 'almacenista':
                    router.push('personal/almacenistaDashboard');
                    break;
                case 'cliente':
                    router.push('client/clienteDashboard');
                    break;
                default:
                    setError('Rol no válido');
            }
        } catch (err) {
            console.error('Error de login:', err);
            setError('Error de conexión. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="flex justify-between items-center pb-2">
                    <div className="w-full text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Iniciar Sesión
                        </h2>
                        <p className="text-gray-500 mt-2">Bienvenido de nuevo</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="absolute right-4 top-4 hover:bg-gray-100 rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingrese su correo electrónico"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                required
                            />
                        </div>
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}
                        <Button 
                            type="submit" 
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            Iniciar Sesión
                        </Button>
                        <div className="text-center">
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
