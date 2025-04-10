import { useEffect, useState } from "react";
import { Button } from "@/components/ui/index.ui";
import { ConsultaCompletada } from "@/types/vetdoc";
import { ChevronRight, Clock, PawPrint } from "lucide-react";
import { API_CONFIG, ApiService } from "@/services/index.services";


export const ConsultasCompletadasList: React.FC<{
    onConsultaSelect: (consulta: ConsultaCompletada) => void;
}> = ({ onConsultaSelect }) => {
    const [consultas, setConsultas] = useState<ConsultaCompletada[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarConsultas = async () => {
            try {
                const data = await ApiService.fetch<ConsultaCompletada[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVCONS}`,
                    { method: 'GET' }
                );
                setConsultas(data);
            } catch (error) {
                console.error('Error al cargar consultas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarConsultas();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Cargando consultas...</div>;
    }

    return (
        <div className="space-y-4">
            {consultas.map((consulta) => (
                <div
                    key={consulta.ServicioID}
                    className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onConsultaSelect(consulta)}
                >
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <PawPrint size={16} className="text-blue-500" />
                                <span className="font-medium">{consulta.Mascota}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} />
                                {new Date(consulta["Hora terminada"]).toLocaleString()}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Peso: </span>
                                    {consulta.Peso} kg
                                </div>
                                <div>
                                    <span className="font-medium">Temperatura: </span>
                                    {consulta.Temperatura}°C
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => onConsultaSelect(consulta)}
                            className="flex items-center"
                        >
                            Internar
                            <ChevronRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>
            ))}

            {consultas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No hay consultas completadas disponibles
                </div>
            )}
        </div>
    );
};
