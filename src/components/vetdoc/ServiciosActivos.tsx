import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { ServicioActivo, ServicioResponse } from '@/types/vetdoc';
import { Activity, Clock, Check, PawPrint, Scissors, BedDouble, MonitorDot } from 'lucide-react';
import { CompletarCirugiaModal, CompletarConsultaModal, CompletarInternacionModal } from '@/components/vetdoc/index.docvetcomp';


export const ServiciosActivos: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioActivo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [procesando, setProcesando] = useState<number | null>(null);
    const [modalData, setModalData] = useState<{
        servicioId: number; servicioEspecificoId: number; } | null>(null);
    const [modalInternacionData, setModalInternacionData] = useState<{
        servicioId: number; servicioEspecificoId: number; } | null>(null);
    const [modalCirugiaData, setModalCirugiaData] = useState<{
        servicioId: number; servicioEspecificoId: number; } | null>(null);

    const cargarServicios = async () => {
        try {
            const data = await ApiService.fetch<ServicioActivo[]>(
                `${API_CONFIG.ENDPOINTS.DOC_SERVACT}`,
                { method: 'GET' }
            );
            setServicios(data);
        } catch (error) {
            console.error('Error al cargar servicios activos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { cargarServicios(); }, []);

    const handleCompletarServicio = async (servicioId: number) => {
        const servicio = servicios.find(s => s.ServicioID === servicioId);
        
        if (servicio?.Servicio.toLowerCase() === 'consulta') {
            setModalData({
                servicioId: servicio.ServicioID,
                servicioEspecificoId: servicio.ServicioEspecificoID
            });
        } else if (servicio?.Servicio.toLowerCase() === 'internacion') {
            setModalInternacionData({
                servicioId: servicio.ServicioID,
                servicioEspecificoId: servicio.ServicioEspecificoID
            });
        } else if (servicio?.Servicio.toLowerCase() === 'cirugia') {
            setModalCirugiaData({
                servicioId: servicio.ServicioID,
                servicioEspecificoId: servicio.ServicioEspecificoID
            });
        } else {
            // Para otros servicios, completar directamente
            setProcesando(servicioId);
            try {
                const response = await ApiService.fetch<ServicioResponse>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVEND}`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify({ ServicioID: servicioId })
                    }
                );
                
                if (response.Respuesta === "Servicio completado") {
                    await cargarServicios();
                }
            } catch (error) {
                console.error('Error al completar servicio:', error);
            } finally {
                setProcesando(null);
            }
        }
    };

    const getServiceIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'cirugia':
                return <MonitorDot className="text-purple-500" size={20} />;
            case 'peluqueria':
                return <Scissors className="text-purple-500" size={20} />;
            case 'internacion':
                return <BedDouble className="text-purple-500" size={20} />;
            default:
                return <Activity className="text-blue-500" size={20} />;
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Cargando servicios activos...
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No hay servicios activos en este momento
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicios.map((servicio) => (
                    <div
                        key={servicio.ServicioID}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PawPrint className="text-blue-500" size={20} />
                                    <span className="font-medium">
                                        {servicio["Mascota"]}
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
                                    {new Date(new Date(servicio["HoraInicio"]).setHours(
                                        new Date(servicio["HoraInicio"]).getHours() - 4
                                    )).toLocaleString()}
                                </span>
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={() => handleCompletarServicio(servicio.ServicioID)}
                                    disabled={procesando === servicio.ServicioID}
                                    className="w-full"
                                    variant="outline"
                                >
                                    {procesando === servicio.ServicioID ? (
                                        "Procesando..."
                                    ) : (
                                        <>
                                            <Check size={16} className="mr-2" />
                                            Marcar como Completado
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalData && (
                <CompletarConsultaModal
                    servicioId={modalData.servicioId}
                    servicioEspecificoId={modalData.servicioEspecificoId}
                    isOpen={true}
                    onClose={() => setModalData(null)}
                    onSuccess={() => {
                        setModalData(null);
                        cargarServicios();
                    }}
                />
            )}
            {modalInternacionData && (
                <CompletarInternacionModal
                    servicioId={modalInternacionData.servicioId}
                    servicioEspecificoId={modalInternacionData.servicioEspecificoId}
                    isOpen={true}
                    onClose={() => setModalInternacionData(null)}
                    onSuccess={async () => {
                        setModalInternacionData(null);
                        cargarServicios();
                    }}
                />
            )}
            {modalCirugiaData && (
                <CompletarCirugiaModal
                    servicioId={modalCirugiaData.servicioId}
                    servicioEspecificoId={modalCirugiaData.servicioEspecificoId}
                    isOpen={true}
                    onClose={() => setModalCirugiaData(null)}
                    onSuccess={async () => {
                        setModalCirugiaData(null);
                        cargarServicios();
                    }}
                />
            )}
        </>
    );
};
