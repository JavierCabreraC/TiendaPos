import React, { useState } from 'react';
import { ClienteForm } from '@/types/admin';
import { Button } from '@/components/ui/index.ui';
import { ApiService } from '@/services/api';
import { API_CONFIG } from '@/services/constants';

export const CreateClienteForm: React.FC = () => {
    const [formData, setFormData] = useState<ClienteForm>({
        nombre_completo: '',
        numero_ci: 0,
        telefono: '',
        direccion: '',
        email: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_CLIENTES_CREAR, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            // Limpiar el formulario después de una creación exitosa
            setFormData({
                nombre_completo: '',
                numero_ci: 0,
                telefono: '',
                direccion: '',
                email: ''
            });

            alert('Cliente creado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear cliente');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'numero_ci' ? Number(value) : value
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Registrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        name="nombre_completo"
                        value={formData.nombre_completo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de CI
                    </label>
                    <input
                        type="number"
                        name="numero_ci"
                        value={formData.numero_ci}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección
                    </label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                >
                    Registrar Cliente
                </Button>
            </form>
        </div>
    );
};
