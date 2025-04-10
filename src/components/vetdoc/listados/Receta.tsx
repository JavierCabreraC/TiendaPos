import { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Receta } from "@/types/vetdoc";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { Button, Column, DataTable, Input } from "@/components/ui/index.ui";


export const RecetasView: React.FC = () => {
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mascotaId, setMascotaId] = useState<string>('');
    const [isBuscando, setIsBuscando] = useState<boolean>(false);

    const cargarTodasRecetas = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Receta[]>(
                `${API_CONFIG.ENDPOINTS.DOC_RECETA}`,
                { method: 'GET' }
            );
            setRecetas(data);
        } catch (error) {
            console.error('Error al cargar recetas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const buscarRecetasPorMascota = async (id: string) => {
        if (!id.trim()) return;
        
        try {
            setIsBuscando(true);
            setIsLoading(true);
            const data = await ApiService.fetch<Receta[]>(
                `${API_CONFIG.ENDPOINTS.DOC_RECETAMASCOTA}/${id}`,
                { method: 'GET' }
            );
            setRecetas(data);
        } catch (error) {
            console.error('Error al buscar recetas de mascota:', error);
        } finally {
            setIsLoading(false);
            setIsBuscando(false);
        }
    };

    useEffect(() => {
        cargarTodasRecetas();
    }, []);

    const handleBuscar = () => {
        buscarRecetasPorMascota(mascotaId);
    };

    const handleLimpiar = () => {
        setMascotaId('');
        cargarTodasRecetas();
    };

    const columns: Column<Receta>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Fecha', header: 'Fecha' },
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Medicamento', header: 'Medicamento' },
        { key: 'Dosis', header: 'Dosis' },
        { key: 'Indicaciones', header: 'Indicaciones' }
    ];

    const renderMobileCard = (receta: Receta) => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{receta.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{receta.Fecha}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{receta.Mascota} ({receta.Raza})</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Medicamento: </span>
                <span>{receta.Medicamento}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dosis: </span>
                <span>{receta.Dosis}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Indicaciones: </span>
                <span>{receta.Indicaciones}</span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="text-center py-8">Cargando recetas...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recetas Emitidas</h2>
            
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
            {recetas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No se encontraron recetas
                    {mascotaId && " para esta mascota"}
                </div>
            ) : (
                <DataTable<Receta>
                    data={recetas}
                    columns={columns}
                    renderMobileCard={renderMobileCard}
                />
            )}
        </div>
    );
};
