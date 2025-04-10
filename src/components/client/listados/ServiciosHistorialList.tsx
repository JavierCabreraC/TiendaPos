import { Download } from 'lucide-react';
import type { ServicioHistorial } from '@/types/client';
import { generateServiciosHistorialPDF } from '@/utils/index.utils';


interface ServiciosHistorialListProps {
    servicios: ServicioHistorial[];
}

export const ServiciosHistorialList: React.FC<ServiciosHistorialListProps> = ({ servicios }) => {
    const formatDateTime = (dateStr: string): string => {
        return new Date(dateStr).toLocaleString();
    };

    const handleDownloadPDF = () => {
        generateServiciosHistorialPDF(servicios);
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (servicio: ServicioHistorial) => (
        <div key={`${servicio.Mascota}-${servicio.FechaHoraInicio}`} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">Servicio: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {servicio.TipoServicio}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{servicio.Mascota}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Personal: </span>
                <span>{servicio.Personal}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Inicio: </span>
                <span>{formatDateTime(servicio.FechaHoraInicio)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fin: </span>
                <span>{formatDateTime(servicio.FechaHoraFin)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Duración: </span>
                <span>{servicio["Duración (Horas)"]} horas</span>
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
                            Servicio
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Mascota
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Personal
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Inicio
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Fin
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Duración
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 border-b border-gray-200">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {servicio.TipoServicio}
                                </span>
                            </td>
                            <td className="p-3 border-b border-gray-200">{servicio.Mascota}</td>
                            <td className="p-3 border-b border-gray-200">{servicio.Personal}</td>
                            <td className="p-3 border-b border-gray-200">
                                {formatDateTime(servicio.FechaHoraInicio)}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                {formatDateTime(servicio.FechaHoraFin)}
                            </td>
                            <td className="p-3 border-b border-gray-200 text-center">
                                {servicio["Duración (Horas)"]} h
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
                {servicios.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No hay servicios registrados
                    </div>
                ) : (
                    <>
                        {/* Vista móvil */}
                        <div className="md:hidden">
                            {servicios.map((servicio) => renderMobileCard(servicio))}
                        </div>

                        {/* Vista desktop */}
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                    </>
                )}
            </div>
            
            {servicios.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar PDF
                    </button>
                </div>
            )}
        </div>
    );
};
