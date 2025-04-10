import { useEffect, useState } from "react";
import { ServicioCompletado } from "@/types/vetdoc";
import { Button, Input } from "@/components/ui/index.ui";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { CalendarClock, ChevronRight, PawPrint, Search } from "lucide-react";


export const ServiciosCompletadosList: React.FC<{
    onServicioSelect: (servicio: ServicioCompletado) => void
}> = ({ onServicioSelect }) => {
    const [servicios, setServicios] = useState<ServicioCompletado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const data = await ApiService.fetch<ServicioCompletado[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVCOM}`,
                    { method: 'GET' }
                );
                const serviciosFiltrados = data.filter(
                    s => s.Servicio === 'Consulta' || s.Servicio === 'Internacion'
                );
                setServicios(serviciosFiltrados);
            } catch (error) {
                console.error('Error al cargar servicios:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarServicios();
    }, []);

    const serviciosFiltrados = servicios.filter(s => 
        s["Nombre de Mascota"].toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        className="pl-10"
                        placeholder="Buscar por mascota..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {serviciosFiltrados.map((servicio) => (
                    <div
                        key={servicio.ServicioID}
                        className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <PawPrint size={16} className="text-blue-500" />
                                    <span className="font-medium">{servicio["Nombre de Mascota"]}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CalendarClock size={16} />
                                    {new Date(servicio["Hora de finalización"]).toLocaleString()}
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Tipo:</span> {servicio.Servicio}
                                </div>
                            </div>
                            <Button 
                                onClick={() => onServicioSelect(servicio)}
                                className="flex items-center"
                            >
                                Registrar
                                <ChevronRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}

                {serviciosFiltrados.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        No hay servicios disponibles para análisis
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8">
                        Cargando servicios...
                    </div>
                )}
            </div>
        </div>
    );
};
