import React from 'react';
import { Download } from 'lucide-react';
import { ReciboCli } from '@/types/client';
import { generateRecibosPDF } from '@/utils/index.utils';


interface RecibosHistorialListProps {
    recibos: ReciboCli[];
}

export const RecibosHistorialList: React.FC<RecibosHistorialListProps> = ({ recibos }) => {
    const formatDateTime = (dateStr: string): string => {
        return new Date(dateStr).toLocaleString();
    };

    const formatCurrency = (amount: string): string => {
        return `BOB/. ${parseFloat(amount).toFixed(2)}`;
    };

    const handleDownloadPDF = () => {
        generateRecibosPDF(recibos);
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (recibo: ReciboCli) => (
        <div key={recibo.ReciboID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">Servicio: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {recibo.TipoServicio}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Recibo #: </span>
                <span>{recibo.ReciboID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{formatDateTime(recibo.FechaEmision)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Total: </span>
                <span className="text-green-600 font-semibold">{formatCurrency(recibo.Total)}</span>
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
                            Recibo #
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Servicio
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Fecha Emisión
                        </th>
                        <th className="p-3 bg-gray-100 text-right font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recibos.map((recibo) => (
                        <tr key={recibo.ReciboID} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 border-b border-gray-200">
                                {recibo.ReciboID}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {recibo.TipoServicio}
                                </span>
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                {formatDateTime(recibo.FechaEmision)}
                            </td>
                            <td className="p-3 border-b border-gray-200 text-right font-semibold text-green-600">
                                {formatCurrency(recibo.Total)}
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
                {recibos.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No hay recibos registrados
                    </div>
                ) : (
                    <>
                        {/* Vista móvil */}
                        <div className="md:hidden">
                            {recibos.map((recibo) => renderMobileCard(recibo))}
                        </div>
    
                        {/* Vista desktop */}
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                    </>
                )}
            </div>
            
            {recibos.length > 0 && (
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
