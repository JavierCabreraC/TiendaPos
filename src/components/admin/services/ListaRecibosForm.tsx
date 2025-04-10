import { useState } from "react";
import { ReciboGeneral } from "@/types/admin";
import { Button, Column, DataTable, Input } from "@/components/ui/index.ui";


interface ListaRecibosFormProps {
    isLoading: boolean;
    onSubmit: (ci: string) => Promise<void>;
    recibos: ReciboGeneral[];
}

export const ListaRecibosForm: React.FC<ListaRecibosFormProps> = ({
    isLoading,
    onSubmit,
    recibos
}) => {
    const [ci, setCI] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(ci);
    };

    const columns: Column<ReciboGeneral>[] = [
        { key: 'ID', header: 'ID' },
        { 
            key: 'FechaEmision', 
            header: 'Fecha',
            render: (recibo) => new Date(recibo.FechaEmision).toLocaleString()
        },
        { key: 'EstadoPago', header: 'Estado' },
        { 
            key: 'Total', 
            header: 'Total',
            render: (recibo) => `Bs. ${parseFloat(recibo.Total).toFixed(2)}`
        },
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Cliente', header: 'Cliente' }
    ];

    const renderMobileCard = (recibo: ReciboGeneral) => (
        <div key={recibo.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{recibo.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{new Date(recibo.FechaEmision).toLocaleString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span>{recibo.EstadoPago}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Total: </span>
                <span>Bs. {parseFloat(recibo.Total).toFixed(2)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{recibo.Mascota}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cliente: </span>
                <span>{recibo.Cliente}</span>
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
                    {isLoading ? 'Buscando...' : 'Buscar Recibos'}
                </Button>
            </form>

            {recibos.length > 0 && (
                <DataTable
                    data={recibos}
                    columns={columns}
                    renderMobileCard={renderMobileCard}
                />
            )}
        </div>
    );
};
