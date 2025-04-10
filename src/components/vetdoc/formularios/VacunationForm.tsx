import { useEffect, useState } from 'react';
import { ApiService } from '@/services/index.services';
import { Button, Input } from '@/components/ui/index.ui';
import type { Vacuna, NuevaVacunacion, VacunacionResponse, VacunacionFormProps } from '@/types/index.types';


export const VacunacionForm: React.FC<VacunacionFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<NuevaVacunacion>({
        FechaVacunacion: '',
        ProximaFecha: '',
        VacunaID: 0,
        MascotaID: 0
    });
    
    const [vacunasDisponibles, setVacunasDisponibles] = useState<Vacuna[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cargarVacunas = async () => {
            try {
                const data = await ApiService.fetch<Vacuna[]>('/vetdoc/vacunas', {
                    method: 'GET',
                });
                setVacunasDisponibles(data);
            } catch (error) {
                console.error('Error al cargar vacunas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarVacunas();
    }, []); // Se ejecuta solo al montar el componente

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiService.fetch<VacunacionResponse>('/vetdoc/regvac', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            if (response.Respuesta === "Vacunación registrada exitosamente.") {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al registrar vacunación:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-4">
                Cargando vacunas disponibles...
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">ID de Mascota</label>
                    <Input
                        type="number"
                        value={formData.MascotaID || ''}
                        onChange={(e) => setFormData({...formData, MascotaID: Number(e.target.value)})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Vacuna</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.VacunaID || ''}
                        onChange={(e) => setFormData({...formData, VacunaID: Number(e.target.value)})}
                        required
                    >
                        <option value="">Seleccione una vacuna</option>
                        {vacunasDisponibles.map((vacuna) => (
                            <option key={vacuna.ID} value={vacuna.ID}>
                                {vacuna.Vacuna} - {vacuna.Laboratorio} ({vacuna.Tipo})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Vacunación</label>
                    <Input
                        type="date"
                        value={formData.FechaVacunacion}
                        onChange={(e) => setFormData({...formData, FechaVacunacion: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Próxima Fecha</label>
                    <Input
                        type="date"
                        value={formData.ProximaFecha}
                        onChange={(e) => setFormData({...formData, ProximaFecha: e.target.value})}
                        required
                    />
                </div>

                <Button type="submit" className="w-full">
                    Registrar Vacunación
                </Button>
            </form>
        </div>
    );
};
