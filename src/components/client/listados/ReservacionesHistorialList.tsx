import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { HistorialReservacion } from '@/types/client';


interface ReservacionesHistorialListProps {
    reservaciones: HistorialReservacion[];
}

export const ReservacionesHistorialList: React.FC<ReservacionesHistorialListProps> = ({
    reservaciones
}) => {
    const formatDateTime = (dateStr: string): string => {
        return new Date(dateStr).toLocaleString();
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (reservacion: HistorialReservacion) => (
        <div key={reservacion.ReservacionID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">Reservación #: </span>
                <span>{reservacion.ReservacionID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Motivo: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {reservacion.Motivo}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reservacion.Estado === 'Realizada' 
                        ? 'bg-green-100 text-green-800'
                        : reservacion.Estado === 'Cancelada'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {reservacion.Estado}
                </span>
            </div>
            <div className="mb-2 flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{formatDateTime(reservacion.Fecha_y_Hora)}</span>
            </div>
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Motivo
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Fecha y Hora
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservaciones.map((reservacion) => (
                        <tr key={reservacion.ReservacionID} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 border-b border-gray-200">
                                {reservacion.ReservacionID}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {reservacion.Motivo}
                                </span>
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    {formatDateTime(reservacion.Fecha_y_Hora)}
                                </div>
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex justify-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        reservacion.Estado === 'Realizada'
                                            ? 'bg-green-100 text-green-800'
                                            : reservacion.Estado === 'Cancelada'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {reservacion.Estado}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
                {reservaciones.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No hay reservaciones registradas
                    </div>
                ) : (
                    <>
                        {/* Vista móvil */}
                        <div className="md:hidden">
                            {reservaciones.map(reservacion => renderMobileCard(reservacion))}
                        </div>

                        {/* Vista desktop */}
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
