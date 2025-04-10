import React, { useState, useEffect } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { ApiService, API_CONFIG } from '@/services/index.services';
import { User, Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import type { ReservacionV, ReservacionesPendientesProps } from '@/types/vetdoc';


export const ReservacionesPendientes: React.FC<ReservacionesPendientesProps> = ({ 
    onReservacionSelect 
}) => {
    const [reservaciones, setReservaciones] = useState<ReservacionV[]>([]);
    const [filtro, setFiltro] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarReservaciones = async () => {
            try {
                const data = await ApiService.fetch<ReservacionV[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_RESERVPEN}`,
                    { method: 'GET' }
                );
                setReservaciones(data);
            } catch (error) {
                console.error('Error al cargar reservaciones:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarReservaciones();
    }, []);

    const handleReservacionSelect = (reservacion: ReservacionV) => {
        onReservacionSelect(reservacion);
    };

    const reservacionesFiltradas = reservaciones.filter(res => 
        res.Cliente.toLowerCase().includes(filtro.toLowerCase())
    );

    const getReservacionStyles = (motivo: string) => {
        if (motivo === "Cirugía Programada") {
            return {
                container: "bg-blue-50 border-blue-200 shadow-sm hover:shadow-md transition-shadow rounded-lg p-4 border-l-4 border-l-blue-500",
                title: "text-blue-700",
                icon: "text-blue-500",
                button: "bg-blue-500 text-white hover:bg-blue-600"
            };
        }
        return {
            container: "bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow",
            title: "text-gray-900",
            icon: "text-blue-500",
            button: "bg-gray-50 text-gray-900 hover:bg-gray-100"
        };
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        className="pl-10"
                        placeholder="Buscar por cliente..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {reservacionesFiltradas.map((reservacion) => {
                    const styles = getReservacionStyles(reservacion.Motivo);
                    
                    return (
                        <div
                            key={reservacion.ReservacionID}
                            className={styles.container}
                        >
                            <div className="flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className={styles.icon} />
                                        <span className={`font-medium ${styles.title}`}>
                                            {reservacion.Cliente}
                                        </span>
                                        {reservacion.Motivo === "Cirugía Programada" && (
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                Cirugía
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={16} />
                                        {new Date(reservacion.Hora).toLocaleDateString()}
                                        <Clock size={16} className="ml-2" />
                                        {new Date(reservacion.Hora).toLocaleTimeString()}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Estado:</span> {reservacion.Estado}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Motivo:</span> {reservacion.Motivo}
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => handleReservacionSelect(reservacion)}
                                    className={`flex items-center ${styles.button}`}
                                    variant={reservacion.Motivo === "Cirugía Programada" ? "default" : "outline"}
                                >
                                    Atender
                                    <ChevronRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    );
                })}

                {reservacionesFiltradas.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        No hay reservaciones pendientes
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        Cargando reservaciones...
                    </div>
                )}
            </div>
        </div>
    );
};
