import React, { useState } from 'react';
import { calcularPrecioServicio } from '@/utils/index.utils';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { ViewState, ServicioRecibo, DetalleReciboPreview, ServicioGeneral, ReciboGeneral, ReciboPendiente } from '@/types/admin';
import { ListaRecibosForm, PaymentModal, ReciboPreview, RecibosPendientesForm, ServicioReciboForm, ServiciosCompletadosForm } from '@/components/admin/index.admincomp';


interface ServicioSectionProps {
    view: ViewState;
}

export const ServiceSection: React.FC<ServicioSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarPreview, setMostrarPreview] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [servicios, setServicios] = useState<ServicioRecibo[]>([]);
    const [recibosLista, setRecibosLista] = useState<ReciboGeneral[]>([]);
    const [detallesRecibo, setDetallesRecibo] = useState<DetalleReciboPreview[]>([]);
    const [currentReciboId, setCurrentReciboId] = useState<number | undefined>(undefined);
    const [serviciosCompletados, setServiciosCompletados] = useState<ServicioGeneral[]>([]);
    const [recibosPendientes, setRecibosPendientes] = useState<ReciboPendiente[]>([]);
    
    const resetearTodo = () => {
        setServicios([]);
        setDetallesRecibo([]);
        setMostrarPreview(false);
    };

    const handleBuscarServicios = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ServicioRecibo[]>(
                `${API_CONFIG.ENDPOINTS.ADM_SERVRECIBO}/${ci}`,
                { method: 'GET' }
            );
            setServicios(data);
            setMostrarPreview(false);
        } catch (error) {
            console.error('Error al buscar servicios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiciosSelect = (serviciosSeleccionados: ServicioRecibo[]) => {
        const detalles: DetalleReciboPreview[] = serviciosSeleccionados.map(servicio => ({
            ServicioID: servicio.ServicioID,
            Detalle: servicio.TipoServicio,
            PrecioUnitario: calcularPrecioServicio(servicio.TipoServicio), // Usar precio base
            NombreCliente: servicio.NombreCliente
        }));
        
        setDetallesRecibo(detalles);
        setMostrarPreview(true);
    };

    const handleVolver = () => {
        console.log({setCurrentReciboId});
        setMostrarPreview(false);
        // Opcionalmente, se podría mantener las selecciones previas
        // Para resetear todo, añadir: setDetallesRecibo([]);
    };

    const handleBuscarRecibosPendientes = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ReciboPendiente[]>(
                `${API_CONFIG.ENDPOINTS.ADM_SERVPENDIENTE}/${ci}`,
                { method: 'GET' }
            );
            setRecibosPendientes(data);
        } catch (error) {
            console.error('Error al buscar recibos pendientes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDetalleChange = (index: number, detalle: DetalleReciboPreview) => {
        const nuevosDetalles = [...detallesRecibo];
        nuevosDetalles[index] = detalle;
        setDetallesRecibo(nuevosDetalles);
    };

    const handleReciboCreado = (reciboId: number) => {
        setCurrentReciboId(reciboId);
    };

    const handlePagar = (reciboId: number) => {
        console.log({reciboId});
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        resetearTodo();
    };

    const handleBuscarServiciosCompletados = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ServicioGeneral[]>(
                `${API_CONFIG.ENDPOINTS.ADM_SERVGRAL}/${ci}`,
                { method: 'GET' }
            );
            setServiciosCompletados(data);
        } catch (error) {
            console.error('Error al buscar servicios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBuscarRecibos = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ReciboGeneral[]>(
                `${API_CONFIG.ENDPOINTS.ADM_CREARRECIBO}/${ci}`,
                { method: 'GET' }
            );
            setRecibosLista(data);
        } catch (error) {
            console.error('Error al buscar recibos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    switch (view) {
        case 'create-receipt':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Generar Recibo</h2>
                    {!mostrarPreview ? (
                        <ServicioReciboForm
                            isLoading={isLoading}
                            onSubmit={handleBuscarServicios}
                            servicios={servicios}
                            onServiciosSelect={handleServiciosSelect}
                        />
                    ) : (
                        <>
                            <ReciboPreview
                                detalles={detallesRecibo}
                                onDetalleChange={handleDetalleChange}
                                onVolver={handleVolver}
                                onReciboCreado={handleReciboCreado}
                                onPagar={handlePagar}
                                reciboId={currentReciboId}
                            />
                            {showPaymentModal && currentReciboId && (
                                <PaymentModal
                                    reciboId={Number(currentReciboId)}
                                    amount={detallesRecibo.reduce((sum, d) => sum + Number(d.PrecioUnitario), 0)}
                                    onClose={() => setShowPaymentModal(false)}
                                    onSuccess={handlePaymentSuccess}
                                />
                            )}
                        </>
                    )}
                </div>
            );

        case 'list-completed-services':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Servicios Completados</h2>
                    <ServiciosCompletadosForm
                        isLoading={isLoading}
                        onSubmit={handleBuscarServiciosCompletados}
                        servicios={serviciosCompletados}
                    />
                </div>
            );

        case 'list-receipts':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Lista de Recibos</h2>
                    <ListaRecibosForm
                        isLoading={isLoading}
                        onSubmit={handleBuscarRecibos}
                        recibos={recibosLista}
                    />
                </div>
            );

        case 'list-pending-receipts':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Recibos Pendientes</h2>
                    <RecibosPendientesForm
                        isLoading={isLoading}
                        onSubmit={handleBuscarRecibosPendientes}
                        recibos={recibosPendientes}
                    />
                </div>
            );
            
        default:
            return null;
    }
};
