import React, { useState } from 'react';
import { ViewState } from '@/types/admin';
import { Button } from '@/components/ui/index.ui';

interface TiendaReportFormProps {
    view: ViewState;
}

export const TiendaReportForm: React.FC<TiendaReportFormProps> = ({ view }) => {
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');

    const handleGenerarReporte = () => {
        // Aquí se implementará la lógica para generar el reporte
        console.log('Generando reporte:', { view, fechaInicio, fechaFin });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
                {view === 'report-clientes' && 'Reporte de Clientes'}
                {view === 'report-personal' && 'Reporte de Personal'}
                {view === 'report-ventas' && 'Reporte de Ventas'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha Inicio
                    </label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha Fin
                    </label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <Button
                onClick={handleGenerarReporte}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
                Generar Reporte
            </Button>
        </div>
    );
}; 