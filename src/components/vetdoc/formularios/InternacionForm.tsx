import { useState } from "react";
import { Button } from "@/components/ui/index.ui";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { ConsultaCompletada, InternacionResponse, NuevaInternacion } from "@/types/vetdoc";


interface InternacionFormProps {
    consulta: ConsultaCompletada;
    onSuccess: () => void;
    onCancel: () => void;
}

export const InternacionForm: React.FC<InternacionFormProps> = ({
    consulta,
    onSuccess,
    onCancel
}) => {
    const [notas, setNotas] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const internacionData: NuevaInternacion = {
                PesoEntrada: parseFloat(consulta.Peso),
                TemperaturaEntrada: parseFloat(consulta.Temperatura),
                Notas: notas,
                MascotaID: consulta.MascotaID,
                ConsultaID: consulta.ConsultaID
            };

            const response = await ApiService.fetch<InternacionResponse>(
                `${API_CONFIG.ENDPOINTS.DOC_SERVINTER}`,
                {
                    method: 'POST',
                    body: JSON.stringify(internacionData)
                }
            );

            if (response) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al registrar internación:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Información de la Consulta</h3>
                <p><span className="font-medium">Mascota:</span> {consulta.Mascota}</p>
                <p><span className="font-medium">Peso:</span> {consulta.Peso} kg</p>
                <p><span className="font-medium">Temperatura:</span> {consulta.Temperatura}°C</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Notas de Ingreso
                    </label>
                    <textarea
                        className="w-full border rounded-md p-2 min-h-[150px]"
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        maxLength={1500}
                        required
                        disabled={isSubmitting}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {notas.length}/1500 caracteres
                    </p>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                        variant="outline" 
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registrando..." : "Registrar Internación"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
