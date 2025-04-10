import { useState } from "react";
import { Button, Input } from "@/components/ui/index.ui";
import { ApiService, API_CONFIG } from '@/services/index.services';
import { AnalisisRecetaFormProps, AnalisisResultado, NuevoAnalisis } from "@/types/vetdoc";


export const AnalisisForm: React.FC<AnalisisRecetaFormProps> = ({
    servicio,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<NuevoAnalisis>({
        TipoAnalisis: '',
        FechaAnalisis: new Date().toISOString().split('T')[0],
        Resultado: 'Normal',
        ConsultaID: undefined,
        InternacionID: undefined
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const esConsulta = servicio.Servicio === 'Consulta';
        const esInternacion = servicio.Servicio === 'Internacion';

        if (!esConsulta && !esInternacion) {
            onCancel();
            return;
        }

        try {
            const endpoint = esConsulta ? 
                API_CONFIG.ENDPOINTS.DOC_ANALISISCONS : API_CONFIG.ENDPOINTS.DOC_ANALISISINT;

            const analisisData: NuevoAnalisis = {
                TipoAnalisis: formData.TipoAnalisis,
                FechaAnalisis: formData.FechaAnalisis,
                Resultado: formData.Resultado,
                ...(esConsulta 
                    ? { ConsultaID: servicio.ServicioEspecificoID }
                    : { InternacionID: servicio.ServicioEspecificoID })
            };

            const response = await ApiService.fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(analisisData)
            });

            if (response) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al registrar análisis:', error);
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
                    <label className="block text-sm font-medium mb-1">
                        Tipo de Análisis
                    </label>
                    <Input
                        value={formData.TipoAnalisis}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            TipoAnalisis: e.target.value
                        }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fecha del Análisis
                    </label>
                    <Input
                        type="date"
                        value={formData.FechaAnalisis}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            FechaAnalisis: e.target.value
                        }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Resultado
                    </label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.Resultado}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            Resultado: e.target.value as AnalisisResultado
                        }))}
                        required
                    >
                        <option value="Normal">Normal</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Estable">Estable</option>
                        <option value="Elevado">Elevado</option>
                        <option value="Bueno">Bueno</option>
                        <option value="Critico">Crítico</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Registrar Análisis
                    </Button>
                </div>
            </form>
        </div>
    );
};
