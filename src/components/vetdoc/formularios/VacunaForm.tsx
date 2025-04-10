import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui/index.ui';
import { VacunacionFormProps } from '@/types/index.types';
import { API_CONFIG, ApiService } from '@/services/index.services';


export const VacunaForm: React.FC<VacunacionFormProps> = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        NombreVacuna: '',
        Descripcion: '',
        Laboratorio: '',
        EdadMinima: '',
        Tipo: ''
    });

    const [ alertInfo, setAlertInfo ] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log({alertInfo});
        setAlertInfo({ type: null, message: '' });

        try {
            // Registrar la nueva vacuna
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_VACUNAS}`, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    EdadMinima: parseInt(formData.EdadMinima)
                })
            });

            // Notificar éxito y redirigir
            setTimeout(() => {
                onSuccess();
            }, 1500);
            
            onSuccess();
        } catch (error) {
            console.error('Error al registrar vacuna:', error);
            setAlertInfo({
                type: 'error',
                message: 'No se pudo registrar la vacuna'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre de la Vacuna</label>
                    <Input
                        value={formData.NombreVacuna}
                        onChange={(e) => setFormData({...formData, NombreVacuna: e.target.value})}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <Input
                        value={formData.Descripcion}
                        onChange={(e) => setFormData({...formData, Descripcion: e.target.value})}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Laboratorio</label>
                    <Input
                        value={formData.Laboratorio}
                        onChange={(e) => setFormData({...formData, Laboratorio: e.target.value})}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Edad Mínima (meses)</label>
                    <Input
                        type="number"
                        value={formData.EdadMinima}
                        onChange={(e) => setFormData({...formData, EdadMinima: e.target.value})}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.Tipo}
                        onChange={(e) => setFormData({...formData, Tipo: e.target.value})}
                        required
                        disabled={isSubmitting}
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Canina">Canina</option>
                        <option value="Felina">Felina</option>
                        <option value="General">General</option>
                    </select>
                </div>

                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registrando...
                        </>
                    ) : (
                        'Registrar Vacuna'
                    )}
                </Button>
            </form>
        </div>
    );
};
