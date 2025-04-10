import React, { useState } from 'react';
import type { ServicioRecibo } from '@/types/admin';
import { Button, Column, CheckboxSimple, Input, DataTable } from '@/components/ui/index.ui';


interface ServicioReciboFormProps {
    isLoading: boolean;
    onSubmit: (ci: string) => Promise<void>;
    servicios: ServicioRecibo[];
    onServiciosSelect: (servicios: ServicioRecibo[]) => void;
}

export const ServicioReciboForm: React.FC<ServicioReciboFormProps> = ({
    isLoading,
    onSubmit,
    servicios,
    onServiciosSelect
}) => {
    const [ci, setCI] = useState('');
    const [selectedServicios, setSelectedServicios] = useState<Set<number>>(new Set());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(ci);
    };

    const handleSelectionChange = (servicioId: number) => {
        const newSelection = new Set(selectedServicios);
        if (newSelection.has(servicioId)) {
            newSelection.delete(servicioId);
        } else {
            newSelection.add(servicioId);
        }
        setSelectedServicios(newSelection);
    };

    const handleGenerarRecibo = () => {
        const serviciosSeleccionados = servicios.filter(
            servicio => selectedServicios.has(servicio.ServicioID)
        );
        onServiciosSelect(serviciosSeleccionados);
    };

    const columns: Column<ServicioRecibo>[] = [
        {
            key: 'select',
            header: 'Seleccionar',
            render: (servicio) => (
                <CheckboxSimple
                    checked={selectedServicios.has(servicio.ServicioID)}
                    onCheckedChange={() => handleSelectionChange(servicio.ServicioID)}
                />
            )
        },
        { key: 'ServicioID', header: 'ID' },
        { key: 'TipoServicio', header: 'Tipo de Servicio' },
        { 
            key: 'FechaHoraInicio',
            header: 'Inicio',
            render: (servicio) => new Date(servicio.FechaHoraInicio).toLocaleString()
        },
        { 
            key: 'FechaHoraFin',
            header: 'Fin',
            render: (servicio) => new Date(servicio.FechaHoraFin).toLocaleString()
        },
        { key: 'NombreMascota', header: 'Mascota' },
        { key: 'NombreCliente', header: 'Cliente' }
    ];

    const renderMobileCard = (servicio: ServicioRecibo) => (
        <div key={servicio.ServicioID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Seleccionar:</span>
                <CheckboxSimple
                    checked={selectedServicios.has(servicio.ServicioID)}
                    onCheckedChange={() => handleSelectionChange(servicio.ServicioID)}
                />
            </div>
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{servicio.ServicioID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Tipo: </span>
                <span>{servicio.TipoServicio}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Inicio: </span>
                <span>{new Date(servicio.FechaHoraInicio).toLocaleString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fin: </span>
                <span>{new Date(servicio.FechaHoraFin).toLocaleString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{servicio.NombreMascota}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cliente: </span>
                <span>{servicio.NombreCliente}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Número de Carnet del Cliente
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
                    {isLoading ? 'Buscando...' : 'Buscar Servicios'}
                </Button>
            </form>

            {servicios.length > 0 && (
                <div className="space-y-4">
                    <DataTable
                        data={servicios}
                        columns={columns}
                        renderMobileCard={renderMobileCard}
                    />
                    <Button 
                        onClick={handleGenerarRecibo}
                        disabled={selectedServicios.size === 0}
                        className="w-full md:w-auto"
                    >
                        Generar Recibo ({selectedServicios.size} servicios)
                    </Button>
                </div>
            )}
        </div>
    );
};
