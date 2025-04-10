import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/index.ui';
import type { ServicioCompletado } from '@/types/vetdoc';
import { ApiService, API_CONFIG } from '@/services/index.services';
import { Clock, PawPrint, Activity, Scissors, BedDouble, Syringe, CheckCircle2 } from 'lucide-react';


export const ServiciosCompletados: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioCompletado[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = servicios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(servicios.length / itemsPerPage);

    const renderPagination = () => {
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);
        
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        return (
            <div className="flex flex-wrap justify-center mt-4 gap-1">
                {startPage > 1 && (
                    <Button
                        onClick={() => setCurrentPage(1)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        1
                    </Button>
                )}

                {startPage > 2 && (
                    <span className="mx-1 self-center">...</span>
                )}

                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {page}
                    </Button>
                ))}

                {endPage < totalPages - 1 && (
                    <span className="mx-1 self-center">...</span>
                )}

                {endPage < totalPages && (
                    <Button
                        onClick={() => setCurrentPage(totalPages)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {totalPages}
                    </Button>
                )}
            </div>
        );
    };

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const data = await ApiService.fetch<ServicioCompletado[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVCOM}`,
                    { method: 'GET' }
                );
                setServicios(data);
            } catch (error) {
                console.error('Error al cargar servicios completados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarServicios();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Cargando servicios completados...
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No hay servicios completados
            </div>
        );
    }

    // Helper para obtener el ícono según el tipo de servicio
    const getServiceIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'peluqueria':
                return <Scissors className="text-purple-500" size={20} />;
            case 'consulta':
                return <Activity className="text-purple-500" size={20} />;
            case 'internacion':
                return <BedDouble className="text-purple-500" size={20} />;
            case 'cirugia':
                return <Syringe className="text-purple-500" size={20} />;
        }
    };

    // const columns: Column<ServicioCompletado>[] = [
    //     { key: 'Nombre de Mascota', header: 'Mascota' },
    //     { key: 'Servicio', header: 'Tipo de Servicio' },
    //     { key: 'Estado', header: 'Estado' },
    //     { 
    //         key: 'Hora de finalización',
    //         header: 'Finalizado',
    //         render: (servicio) => new Date(servicio["Hora de finalización"]).toLocaleString()
    //     }
    // ];

    // const renderMobileCard = (servicio: ServicioCompletado) => (
    //     <div className="bg-white rounded-lg shadow-md p-4">
    //         <div className="space-y-3">
    //             <div className="flex items-center justify-between">
    //                 <div className="flex items-center gap-2">
    //                     <PawPrint className="text-blue-500" size={20} />
    //                     <span className="font-medium">{servicio["Nombre de Mascota"]}</span>
    //                 </div>
    //                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
    //                     {servicio.Estado}
    //                 </span>
    //             </div>
                
    //             <div className="flex items-center gap-2 text-sm text-gray-600">
    //                 {getServiceIcon(servicio.Servicio)}
    //                 <span className="font-medium">{servicio.Servicio}</span>
    //             </div>

    //             <div className="flex items-center gap-2 text-sm text-gray-600">
    //                 <Clock size={16} />
    //                 <span>
    //                     Completado: {new Date(servicio["Hora de finalización"]).toLocaleString()}
    //                 </span>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Servicios Completados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((servicio) => (
                    <div
                    key={servicio.ServicioID}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PawPrint className="text-blue-500" size={20} />
                                    <span className="font-medium">
                                        {servicio["Nombre de Mascota"]}
                                    </span>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {servicio.Estado}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                {getServiceIcon(servicio.Servicio)}
                                <span className="font-medium">{servicio.Servicio}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} />
                                <span>
                                    Completado: {new Date(servicio["Hora de finalización"]).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle2 size={16} />
                                <span>Servicio Finalizado</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && renderPagination()}
            {servicios.length > 0 && (
                <div className="text-sm text-gray-500 text-center mt-4">
                    Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, servicios.length)} de {servicios.length}
                </div>
            )}
        </div>
    );

    // return (
    //     <div className="p-6">
    //         {/* <h2 className="text-2xl font-bold mb-6">Servicios Completados</h2> */}
    //         <DataTable<ServicioCompletado>
    //             data={servicios}
    //             columns={columns}
    //             renderMobileCard={renderMobileCard}
    //         />
    //     </div>
    // );
};
