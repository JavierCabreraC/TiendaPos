import { useState } from "react";
import { ServicioGeneral } from "@/types/admin";
import { Button, Column, DataTable, Input } from "@/components/ui/index.ui";


interface ServiciosCompletadosFormProps {
    isLoading: boolean;
    onSubmit: (ci: string) => Promise<void>;
    servicios: ServicioGeneral[];
}

export const ServiciosCompletadosForm: React.FC<ServiciosCompletadosFormProps> = ({
    isLoading,
    onSubmit,
    servicios
}) => {
    const [ci, setCI] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(ci);
    };

    const columns: Column<ServicioGeneral>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Tipo', header: 'Tipo de Servicio' },
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
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Cliente', header: 'Cliente' }
    ];

    const renderMobileCard = (servicio: ServicioGeneral) => (
        <div key={servicio.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{servicio.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Tipo: </span>
                <span>{servicio.Tipo}</span>
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
                <span>{servicio.Mascota}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cliente: </span>
                <span>{servicio.Cliente}</span>
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
                <DataTable
                    data={servicios}
                    columns={columns}
                    renderMobileCard={renderMobileCard}
                />
            )}
        </div>
    );
};
