import { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import type { ViewState, RazaForm } from '@/types/admin';
import { API_CONFIG, ApiService } from '@/services/index.services';


interface CrearRazaFormProps {
    setCurrentView: (view: ViewState) => void;
}

export const CrearRazaForm: React.FC<CrearRazaFormProps> = ({ setCurrentView }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [breedForm, setBreedForm] = useState<RazaForm>({
        NombreRaza: '',
        EspecieID: 1
    });

    const handleCreateRaza = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_RAZA, {
                method: 'POST',
                body: JSON.stringify(breedForm)
            });
            setSuccessMessage("La raza ha sido registrada exitosamente");
            setTimeout(() => {
                setSuccessMessage(null);
                setCurrentView('list-raza');
            }, 2000);
        } catch (error) {
            console.error('Error al crear raza:', error);
            setErrorMessage("Hubo un error al registrar la raza");
            setTimeout(() => setErrorMessage(null), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Registrar Nueva Raza</h2>
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
            <form onSubmit={handleCreateRaza} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nombre de la Raza
                    </label>
                    <Input
                        value={breedForm.NombreRaza}
                        onChange={(e) => setBreedForm({
                            ...breedForm,
                            NombreRaza: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Especie
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={breedForm.EspecieID}
                        onChange={(e) => setBreedForm({
                            ...breedForm,
                            EspecieID: parseInt(e.target.value)
                        })}
                        required
                    >
                        <option value={1}>Perro</option>
                        <option value={2}>Gato</option>
                        <option value={3}>Roedor</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCurrentView('list-raza')}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Raza'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
