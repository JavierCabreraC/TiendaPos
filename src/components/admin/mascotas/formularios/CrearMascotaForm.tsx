import { useEffect, useState } from 'react';
import type { MascotaForm, Raza } from '@/types/admin';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';


export const CreateMascotaForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [razas, setRazas] = useState<Raza[]>([]);
    const [mascotaForm, setMascotaForm] = useState<MascotaForm>({
        Nombre: '',
        Sexo: '',
        FechaDeNacimiento: '',
        Observaciones: '',
        ClienteCI: 0,
        RazaID: 0
    });

    // Cargar razas al montar el componente
    useEffect(() => {
        const loadRazas = async () => {
            try {
                const data = await ApiService.fetch<Raza[]>(API_CONFIG.ENDPOINTS.ADM_RAZA, {
                    method: 'GET',
                });
                setRazas(data);
            } catch (error) {
                console.error('Error al cargar razas:', error);
                setErrorMessage("Error al cargar la lista de razas");
            }
        };

        loadRazas();
    }, []);

    // Agrupar razas por especie para seleccionar
    const razasPorEspecie = razas.reduce<Record<string, Raza[]>>((acc, raza) => {
        if (!acc[raza.NombreEspecie]) {
            acc[raza.NombreEspecie] = [];
        }
        acc[raza.NombreEspecie].push(raza);
        return acc;
    }, {});

    const handleCreateMascota = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_MASCOTAS, {
                method: 'POST',
                body: JSON.stringify(mascotaForm)
            });
            // Resetear formulario
            setMascotaForm({
                Nombre: '',
                Sexo: '',
                FechaDeNacimiento: '',
                Observaciones: '',
                ClienteCI: 0,
                RazaID: 0
            });
            setSuccessMessage("La mascota ha sido registrada exitosamente");
            setTimeout(() => setSuccessMessage(null), 2000);
        } catch (error) {
            console.error('Error al registrar mascota:', error);
            setErrorMessage("Hubo un error al registrar la mascota");
            setTimeout(() => setErrorMessage(null), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Registrar Mascota</h2>
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
            <form onSubmit={handleCreateMascota} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nombre
                    </label>
                    <Input
                        value={mascotaForm.Nombre}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            Nombre: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Sexo
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={mascotaForm.Sexo}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            Sexo: e.target.value
                        })}
                        required
                    >
                        <option value="">Seleccione el sexo</option>
                        <option value="M">Macho</option>
                        <option value="H">Hembra</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fecha de Nacimiento
                    </label>
                    <Input
                        type="date"
                        value={mascotaForm.FechaDeNacimiento}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            FechaDeNacimiento: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Observaciones
                    </label>
                    <textarea
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        value={mascotaForm.Observaciones}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            Observaciones: e.target.value
                        })}
                        placeholder="Ingrese las observaciones relevantes sobre la mascota"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        CI del Cliente (Dueño)
                    </label>
                    <Input
                        type="number"
                        value={mascotaForm.ClienteCI || ''}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            ClienteCI: parseInt(e.target.value)
                        })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Raza
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={mascotaForm.RazaID}
                        onChange={(e) => setMascotaForm({
                            ...mascotaForm,
                            RazaID: parseInt(e.target.value)
                        })}
                        required
                    >
                        <option value="">Seleccione una raza</option>
                        {Object.entries(razasPorEspecie).map(([especie, razasDeEspecie]) => (
                            <optgroup key={especie} label={especie}>
                                {razasDeEspecie.map((raza) => (
                                    <option key={raza.RazaID} value={raza.RazaID}>
                                        {raza.NombreRaza}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
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
                        {isLoading ? 'Registrando...' : 'Registrar Mascota'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
