import React, { useState } from 'react';
import { X } from 'lucide-react';
import { es } from 'date-fns/locale';
import { addHours, format } from 'date-fns'; // añadir addHours en caso de fallo
import { PendingReservation } from '@/types/index.types';


interface ReservationsListProps {
    reservations: PendingReservation[];
    onCancelReservation: (reservationId: number) => Promise<void>;
}

export const ReservationsList: React.FC<ReservationsListProps> = ({ reservations, onCancelReservation }) => {
    
    const [cancellingId, setCancellingId] = useState<number | null>(null);

    const handleCancelClick = async (reservationId: number) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar esta reservación?')) {
            setCancellingId(reservationId);
            try {
                await onCancelReservation(reservationId);
            } catch (error) {
                console.error('Error al cancelar la reservación:', error);
                alert('No se pudo cancelar la reservación. Por favor, intenta de nuevo.');
            } finally {
                setCancellingId(null);
            }
        }
    };

    const formatDateTime = (dateTimeStr: string): string => {
        const date = new Date(dateTimeStr);
        const adjustedDate = addHours(date, 4); // importar de 'date-fns' // main ciclo 2
        return format(adjustedDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es }); // main ciclo 2
        // return format(date, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es }); // viene asi en redesign
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (reservation: PendingReservation) => (
        <div key={reservation.ReservacionID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha y Hora: </span>
                <span className="text-gray-600">
                    {formatDateTime(reservation.Fecha_Hora)}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Motivo: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {reservation.Motivo}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Estado: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {reservation.Estado}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">ID Reservación: </span>
                <span className="text-gray-600">#{reservation.ReservacionID}</span>
            </div>
            <button
                onClick={() => handleCancelClick(reservation.ReservacionID)}
                disabled={cancellingId === reservation.ReservacionID}
                className="w-full mt-2 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
            >
                <X className="w-4 h-4 mr-2" />
                {cancellingId === reservation.ReservacionID ? 'Cancelando...' : 'Cancelar Reservación'}
            </button>
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            ID Reservación
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Fecha y Hora
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Motivo
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr 
                            key={reservation.ReservacionID}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 border-b border-gray-200">
                                #{reservation.ReservacionID}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                {formatDateTime(reservation.Fecha_Hora)}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {reservation.Motivo}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {reservation.Estado}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handleCancelClick(reservation.ReservacionID)}
                                        disabled={cancellingId === reservation.ReservacionID}
                                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        {cancellingId === reservation.ReservacionID ? 'Cancelando...' : 'Cancelar'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {reservations.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No tienes reservaciones pendientes
                </div>
            ) : (
                <>
                    {/* Vista móvil */}
                    <div className="md:hidden">
                        {reservations.map(reservation => renderMobileCard(reservation))}
                    </div>

                    {/* Vista desktop */}
                    <div className="hidden md:block">
                        {renderDesktopTable()}
                    </div>
                </>
            )}
        </div>
    );
};
