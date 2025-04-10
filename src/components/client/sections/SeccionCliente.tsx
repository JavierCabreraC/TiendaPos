import { useEffect, useState } from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { CancelReservationRequest, HistorialReservacion, MascotaCli, PendingReservation, ReciboCli, ServicioHistorial, 
    ViewStateCliente } from '@/types/client';
import { MascotasList, RecibosHistorialList, ReservacionesHistorialList, ReservationForm, ReservationsList, 
    ServiciosHistorialList } from '../index.clientcomp';


interface ClientSectionProps {
    view: ViewStateCliente;
}

export const ClientSection: React.FC<ClientSectionProps> = ({ view }) => {
    const [mascotas, setMascotas] = useState<MascotaCli[]>([]);
    const [reservations, setReservations] = useState<PendingReservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [servicios, setServicios] = useState<ServicioHistorial[]>([]);
    const [isLoadingServicios, setIsLoadingServicios] = useState(false);
    const [recibos, setRecibos] = useState<ReciboCli[]>([]);
    const [isLoadingRecibos, setIsLoadingRecibos] = useState(false);
    const [reservaciones, setReservaciones] = useState<HistorialReservacion[]>([]);
    const [isLoadingReservaciones, setIsLoadingReservaciones] = useState(false);
            
    useEffect(() => {
        const loadServicios = async () => {
            try {
                setIsLoadingServicios(true);
                const data = await ApiService.fetch<ServicioHistorial[]>(
                    `${API_CONFIG.ENDPOINTS.CLI_HISSERVICIOS}`,
                    { method: 'GET' }
                );
                setServicios(data);
            } catch (error) {
                console.error('Error al cargar el historial de servicios:', error);
            } finally {
                setIsLoadingServicios(false);
            }
        };

        loadServicios();
    }, []);

    useEffect(() => {
        const loadRecibos = async () => {
            try {
                setIsLoadingRecibos(true);
                const data = await ApiService.fetch<ReciboCli[]>(
                    `${API_CONFIG.ENDPOINTS.CLI_HISRECIBOS}`,
                    { method: 'GET' }
                );
                setRecibos(data);
            } catch (error) {
                console.error('Error al cargar el historial de recibos:', error);
            } finally {
                setIsLoadingRecibos(false);
            }
        };
    
        if (view === 'history-recibos') {
            loadRecibos();
        }
    }, [view]);

    useEffect(() => {
        if (view === 'list-mascotas') {
            loadMascotas();
        } else if (view === 'list-reservaciones') {
            loadReservations();
        }
    }, [view]);

    useEffect(() => {
        const loadReservaciones = async () => {
            try {
                setIsLoadingReservaciones(true);
                const data = await ApiService.fetch<HistorialReservacion[]>(
                    `${API_CONFIG.ENDPOINTS.CLI_RESERVS}`,
                    { method: 'GET' }
                );
                setReservaciones(data);
            } catch (error) {
                console.error('Error al cargar el historial de reservaciones:', error);
            } finally {
                setIsLoadingReservaciones(false);
            }
        };
    
        if (view === 'history-reservaciones') {
            loadReservaciones();
        }
    }, [view]);

    const loadMascotas = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<MascotaCli[]>(`${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`, {
                method: 'GET',
            });
            setMascotas(data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadReservations = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<PendingReservation[]>(
                `${API_CONFIG.ENDPOINTS.CLI_RESERVACLI}`,
                { method: 'GET' }
            );
            setReservations(data);
        } catch (error) {
            console.error('Error al cargar reservaciones:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReservationSuccess = () => {
        loadReservations();
        // Se podría implementar acá una notificación de éxito
    };

    const handleCancelReservation = async (reservationId: number): Promise<void> => {
        try {
            const cancelRequest: CancelReservationRequest = {
                ReservacionID: reservationId
            };

            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.CLI_RESERVA}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cancelRequest)
            });

            await loadReservations();
        } catch (error) {
            console.error('Error al cancelar la reservación:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Cargando...</div>;
    }

    switch (view) {
        case 'list-mascotas':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Mis Mascotas</h2>
                    <MascotasList mascotas={mascotas} />
                </div>
            );

        case 'create-reservacion':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Agendar Nueva Cita</h2>
                    <ReservationForm
                        onSuccess={handleReservationSuccess}
                        onCancel={() => {}} 
                    />
                </div>
            );

        case 'list-reservaciones':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Mis Reservaciones Pendientes</h2>
                    <ReservationsList 
                        reservations={reservations}
                        onCancelReservation={handleCancelReservation}
                    />
                </div>
            );

        case 'history-reservaciones':
            if (isLoadingReservaciones) {
                return <div className="flex justify-center items-center h-full">Cargando...</div>;
            }
        
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Historial de Reservaciones</h2>
                    <ReservacionesHistorialList reservaciones={reservaciones} />
                </div>
            );

        case 'history-servicios':
            if (isLoadingServicios) {
                return <div className="flex justify-center items-center h-full">Cargando...</div>;
            }
        
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Historial de Servicios</h2>
                    <ServiciosHistorialList servicios={servicios} />
                </div>
            );

        case 'history-recibos':
            if (isLoadingRecibos) {
                return <div className="flex justify-center items-center h-full">Cargando...</div>;
            }
        
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Historial de Recibos</h2>
                    <RecibosHistorialList recibos={recibos} />
                </div>
            );
        
        default:
            return null;
    }
};
