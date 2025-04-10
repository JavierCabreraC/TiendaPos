import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './card';
import { API_CONFIG } from '@/services/index.services';
import { Button, Input } from '@/components/ui/index.ui';


interface ChangePasswordFormProps {
    onClose: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(''); 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');   
        try {
            const response = await fetch(API_CONFIG.ENDPOINTS.AUTH_UPDATEHASH, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    hashActual: currentPassword,
                    hashNuevo: newPassword,
                }),
            }); 
            const data = await response.json(); 
            if (response.ok) {
                setMessage(data.message);
                // impiar los campos del formulario después de un cambio exitoso:
                setEmail('');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setMessage(data.message || 'Error al cambiar la contraseña');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error de conexión');
        }
    };
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Cambiar Contraseña</h2>
                <Button variant="ghost" onClick={onClose}>X</Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                        <Input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                        <Input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    {message && <p className={`text-${message.includes('correctamente') ? 'green' : 'red'}-500`}>{message}</p>}
                    <Button type="submit" className="w-full">Cambiar Contraseña</Button>
                </form>
            </CardContent>
        </Card>
    );
};
