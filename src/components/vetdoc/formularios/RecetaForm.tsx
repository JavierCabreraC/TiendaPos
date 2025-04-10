import { useState } from "react";
import { AnalisisRecetaFormProps } from "@/types/vetdoc";
import { Button, Input } from "@/components/ui/index.ui";
import { ApiService, API_CONFIG } from '@/services/index.services';


export const RecetaForm: React.FC<AnalisisRecetaFormProps> = ({
    servicio,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState({
        Medicamento: '',
        Dosis: '',
        Indicaciones: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = servicio.Servicio === 'Consulta' 
                ? API_CONFIG.ENDPOINTS.DOC_RECETACONS 
                : API_CONFIG.ENDPOINTS.DOC_RECETAINT;

            const recetaData = {
                ...formData,
                ...(servicio.Servicio === 'Consulta' 
                    ? { ConsultaID: servicio.ServicioEspecificoID }
                    : { InternacionID: servicio.ServicioEspecificoID })
            };

            const response = await ApiService.fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(recetaData)
            });

            if (response) onSuccess();
        } catch (error) {
            console.error('Error al registrar receta:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Información del Servicio</h3>
                <p><span className="font-medium">Tipo:</span> {servicio.Servicio}</p>
                <p><span className="font-medium">Mascota:</span> {servicio["Nombre de Mascota"]}</p>
                <p><span className="font-medium">Fecha:</span> {new Date(servicio["Hora de finalización"]).toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Medicamento</label>
                    <Input
                        value={formData.Medicamento}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            Medicamento: e.target.value
                        }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Dosis</label>
                    <Input
                        value={formData.Dosis}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            Dosis: e.target.value
                        }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Indicaciones</label>
                    <textarea
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        value={formData.Indicaciones}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            Indicaciones: e.target.value
                        }))}
                        required
                    />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>Cancelar</Button>
                    <Button type="submit">Registrar Receta</Button>
                </div>
            </form>
        </div>
    );
};
