import React, { useState } from 'react';
// import type { Column } from '@/components/ui/index.ui';
import type { ReservacionCliente } from '@/types/admin';
import { Button, Column, DataTable, Input } from '@/components/ui/index.ui';


interface ReservacionesClienteFormProps {
    isLoading: boolean;
    onSubmit: (ci: string) => Promise<void>;
    reservaciones: ReservacionCliente[];
}

export const ReservacionesClienteForm: React.FC<ReservacionesClienteFormProps> = ({ 
    isLoading, 
    onSubmit,
    reservaciones 
}) => {
    const [ci, setCI] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(ci);
    };

    const columns: Column<ReservacionCliente>[] = [
        { key: 'ReservacionID', header: 'ID' },
        { key: 'Motivo', header: 'Motivo' },
        { 
            key: 'Fecha', 
            header: 'Fecha',
            render: (reservacion: ReservacionCliente) => 
                new Date(reservacion.Fecha).toLocaleDateString()
        },
        { key: 'Hora', header: 'Hora' },
        { key: 'Estado', header: 'Estado' }
    ];

    const renderMobileCard = (reservacion: ReservacionCliente) => (
        <div key={reservacion.ReservacionID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{reservacion.ReservacionID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Motivo: </span>
                <span>{reservacion.Motivo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{new Date(reservacion.Fecha).toLocaleDateString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Hora: </span>
                <span>{reservacion.Hora}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span>{reservacion.Estado}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Número de Carnet
                    </label>
                    <Input
                        type="text"
                        value={ci}
                        onChange={(e) => setCI(e.target.value)}
                        placeholder="Ingrese número de carnet"
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Buscando...' : 'Buscar Reservaciones'}
                </Button>
            </form>

            {reservaciones.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Reservaciones Encontradas</h3>
                    <DataTable
                        data={reservaciones}
                        columns={columns}
                        renderMobileCard={renderMobileCard}
                        itemsPerPage={5}
                    />
                </div>
            )}
        </div>
    );
};
