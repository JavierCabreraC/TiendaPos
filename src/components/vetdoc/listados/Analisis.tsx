import { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Analisis } from "@/types/vetdoc";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { Button, Column, DataTable, Input } from "@/components/ui/index.ui";


export const AnalisisView: React.FC = () => {
    const [analisis, setAnalisis] = useState<Analisis[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mascotaId, setMascotaId] = useState<string>('');
    const [isBuscando, setIsBuscando] = useState<boolean>(false);

    const cargarTodosAnalisis = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Analisis[]>(
                `${API_CONFIG.ENDPOINTS.DOC_ANALISIS}`,
                { method: 'GET' }
            );
            setAnalisis(data);
        } catch (error) {
            console.error('Error al cargar análisis:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const buscarAnalisisPorMascota = async (id: string) => {
        if (!id.trim()) return;
        
        try {
            setIsBuscando(true);
            setIsLoading(true);
            const data = await ApiService.fetch<Analisis[]>(
                `${API_CONFIG.ENDPOINTS.DOC_ANALISISMASCOTA}/${id}`,
                { method: 'GET' }
            );
            setAnalisis(data);
        } catch (error) {
            console.error('Error al buscar análisis de mascota:', error);
        } finally {
            setIsLoading(false);
            setIsBuscando(false);
        }
    };

    useEffect(() => {
        cargarTodosAnalisis();
    }, []);

    const handleBuscar = () => {
        buscarAnalisisPorMascota(mascotaId);
    };

    const handleLimpiar = () => {
        setMascotaId('');
        cargarTodosAnalisis();
    };

    const columns: Column<Analisis>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Fecha', header: 'Fecha' },
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'TipoAnalisis', header: 'Tipo de Análisis' },
        { 
            key: 'Resultado', 
            header: 'Resultado',
            render: (analisis: Analisis) => (
                <span className={`px-2 py-1 rounded-full text-sm ${
                    analisis.Resultado === 'Critico' ? 'bg-red-100 text-red-800' :
                    analisis.Resultado === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {analisis.Resultado}
                </span>
            )
        }
    ];

    const renderMobileCard = (analisis: Analisis) => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{analisis.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{analisis.Fecha}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{analisis.Mascota} ({analisis.Raza})</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Tipo: </span>
                <span>{analisis.TipoAnalisis}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Resultado: </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                    analisis.Resultado === 'Critico' ? 'bg-red-100 text-red-800' :
                    analisis.Resultado === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {analisis.Resultado}
                </span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="text-center py-8">Cargando análisis...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Análisis Realizados</h2>
            
            {/* Barra de búsqueda */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 max-w-xs">
                        <Input
                            type="text"
                            placeholder="ID de Mascota"
                            value={mascotaId}
                            onChange={(e) => setMascotaId(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button
                        onClick={handleBuscar}
                        disabled={isBuscando || !mascotaId.trim()}
                        className="flex items-center gap-2"
                    >
                        {isBuscando ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Search className="h-4 w-4" />
                                Buscar
                            </>
                        )}
                    </Button>
                    {mascotaId && (
                        <Button
                            variant="outline"
                            onClick={handleLimpiar}
                            className="flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Limpiar
                        </Button>
                    )}
                </div>
            </div>

            {/* Resultados */}
            {analisis.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No se encontraron análisis
                    {mascotaId && " para esta mascota"}
                </div>
            ) : (
                <DataTable<Analisis>
                    data={analisis}
                    columns={columns}
                    renderMobileCard={renderMobileCard}
                />
            )}
        </div>
    );
};
