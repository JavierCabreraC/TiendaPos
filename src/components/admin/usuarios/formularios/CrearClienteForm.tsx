import { useState } from 'react';
import type { ClienteForm } from '@/types/admin';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService,  } from '@/services/index.services';


export const CreateClienteForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [clienteForm, setClienteForm] = useState<ClienteForm>({
        NombreCompleto: '',
        Telefono: '',
        Direccion: '',
        Contacto: '',
        Email: '',
        NumeroCI: 0
    });

    const handleCreateCliente = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_CLIENTES, {
                method: 'POST',
                body: JSON.stringify(clienteForm)
            });
            // Resetear formulario
            setClienteForm({
                NombreCompleto: '',
                Telefono: '',
                Direccion: '',
                Email: '',
                Contacto: '',
                NumeroCI: 0
            });
            setSuccessMessage("El cliente ha sido registrado exitosamente");
            setTimeout(() => setSuccessMessage(null), 2000);
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            setErrorMessage("Hubo un error al registrar el cliente");
            setTimeout(() => setErrorMessage(null), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Registrar Cliente</h2>
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleCreateCliente} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nombre Completo
                    </label>
                    <Input
                        value={clienteForm.NombreCompleto}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            NombreCompleto: e.target.value
                        })}
                        placeholder="Nombre Completo"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Contacto
                    </label>
                    <Input
                        value={clienteForm.Contacto}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            Contacto: e.target.value
                        })}
                        placeholder="Contacto"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Número de Cédula de Identidad
                    </label>
                    <Input
                        value={clienteForm.NumeroCI}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            NumeroCI: parseInt(e.target.value, 10)
                        })}
                        placeholder="Número de Carnet"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Teléfono
                    </label>
                    <Input
                        type="tel"
                        value={clienteForm.Telefono}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            Telefono: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Dirección
                    </label>
                    <Input
                        value={clienteForm.Direccion}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            Direccion: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <Input
                        type="email"
                        value={clienteForm.Email}
                        onChange={(e) => setClienteForm({
                            ...clienteForm,
                            Email: e.target.value
                        })}
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Cliente'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
