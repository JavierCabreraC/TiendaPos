import { useState } from 'react';
import { useRouter } from 'next/router';
import { PersonalForm } from '@/types/admin';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService,  } from '@/services/index.services';


export const CrearPersonalForm: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [staffForm, setPersonalForm] = useState<PersonalForm>({
        NombreCompleto: '',
        Telefono: '',
        NumeroCI: 0,
        Direccion: '',
        Email: '',
        FechaContratacion: '',
        CargoID: 0,
        ProfesionID: 0
    });

    const handleCreatePersonal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_PERSONAL, {
                method: 'POST',
                body: JSON.stringify(staffForm)
            });
            // Resetear formulario
            setPersonalForm({
                NombreCompleto: '',
                Telefono: '',
                NumeroCI: 0,
                Direccion: '',
                Email: '',
                FechaContratacion: '',
                CargoID: 0,
                ProfesionID: 0
            });
            setSuccessMessage("El personal ha sido registrado exitosamente");
            setTimeout(() => setSuccessMessage(null), 2000);
        } catch (error) {
            console.error('Error al registrar personal:', error);
            setErrorMessage("Hubo un error al registrar el personal");
            setTimeout(() => setErrorMessage(null), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Registrar Personal</h2>
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
            <form onSubmit={handleCreatePersonal} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nombre Completo
                    </label>
                    <Input
                        value={staffForm.NombreCompleto}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            NombreCompleto: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Teléfono
                    </label>
                    <Input
                        value={staffForm.Telefono}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            Telefono: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Número de Cédula de Identidad
                    </label>
                    <Input
                        value={staffForm.NumeroCI}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            NumeroCI: parseInt(e.target.value, 10)
                        })}
                        placeholder="Número de Carnet"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Dirección
                    </label>
                    <Input
                        value={staffForm.Direccion}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
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
                        value={staffForm.Email}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            Email: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fecha de Contratación
                    </label>
                    <Input
                        type="date"
                        value={staffForm.FechaContratacion}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            FechaContratacion: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Cargo
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={staffForm.CargoID}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            CargoID: parseInt(e.target.value, 10)
                        })}
                        required
                    >
                        <option value="">Seleccione un cargo</option>
                        <option value="2">Veterinario</option>
                        <option value="3">Laboratorista</option>
                        <option value="4">Enfermero</option>
                        <option value="5">Peluquero</option>
                        <option value="6">Practicante</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Profesión
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={staffForm.ProfesionID}
                        onChange={(e) => setPersonalForm({
                            ...staffForm,
                            ProfesionID: parseInt(e.target.value, 10)
                        })}
                        required
                    >
                        <option value="">Seleccione una profesión</option>
                        <option value="1">Médico Veterinario</option>
                        <option value="3">Bioquímico</option>
                        <option value="4">Enfermero</option>
                        <option value="5">Estudiante</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => router.push('/admin/dashboard')}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Personal'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
