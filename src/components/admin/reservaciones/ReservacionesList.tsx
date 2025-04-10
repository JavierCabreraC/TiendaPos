import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Reservacion } from "@/types/admin";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Button, Column, DataTable } from '@/components/ui/index.ui';


interface ReservacionListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const ReservacionList: React.FC<ReservacionListProps> = ({ isLoading, setIsLoading }) => {
    const [reservacionList, setReservacionList] = useState<Reservacion[]>([]);

    const reservacionColumns: Column<Reservacion>[] = [
        { key: 'ReservacionID', header: 'ID' },
        { 
            key: 'Fecha_Hora', 
            header: 'Fecha y Hora',
            render: (reservacion: Reservacion) => new Date(reservacion.Fecha_Hora).toLocaleString()
        },
        { key: 'UsuarioID', header: 'ID Usuario' },
        { key: 'NombreCliente', header: 'Cliente' },
        { key: 'Estado', header: 'Estado' },
        {
            key: 'actions',
            header: 'Cancelar',
            render: (reservacion: Reservacion) => (
                <Button
                    onClick={() => handleEditReserv(reservacion)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderReservacionMobileCard = (reservacion: Reservacion) => (
        <div key={reservacion.ReservacionID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{reservacion.ReservacionID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha y Hora: </span>
                <span>{new Date(reservacion.Fecha_Hora).toLocaleString()}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">ID Usuario: </span>
                <span>{reservacion.UsuarioID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cliente: </span>
                <span>{reservacion.NombreCliente}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span>{reservacion.Estado}</span>
            </div>
            <Button
                onClick={() => handleEditReserv(reservacion)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const loadReservacionData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Reservacion[]>(`${API_CONFIG.ENDPOINTS.ADM_RESERV}`, {
                method: 'GET',
            });
            setReservacionList(data);
        } catch (error) {
            console.error('Error al cargar reservaciones:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditReserv = async (reservacion: Reservacion) => {
        try {
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_RESERV, {
                method: 'PATCH',
                body: JSON.stringify({ ReservacionID: reservacion.ReservacionID })
            });

            await loadReservacionData();
            
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    useEffect(() => {
        loadReservacionData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Reservaciones Pendientes</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={reservacionList}
                    columns={reservacionColumns}
                    renderMobileCard={renderReservacionMobileCard}
                />
            )}
        </div>
    );
};
