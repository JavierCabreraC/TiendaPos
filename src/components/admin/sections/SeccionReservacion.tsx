import { useState } from "react";
import { ReservacionCliente, ViewState } from "@/types/admin";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { ReservacionesClienteForm, ReservacionList } from "../index.admincomp";


interface ReservacionSectionProps {
    view: ViewState;
}

export const ReservacionSection: React.FC<ReservacionSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reservacionesCliente, setReservacionesCliente] = useState<ReservacionCliente[]>([]);

    const handleBuscarReservaciones = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ReservacionCliente[]>(
                `${API_CONFIG.ENDPOINTS.ADM_RESERVCLI}/${ci}`,
                { method: 'GET' }
            );
            setReservacionesCliente(data);
        } catch (error) {
            console.error('Error al buscar reservaciones:', error);
        } finally {
            setIsLoading(false);
        }
    };

    switch (view) {
        case 'zzzxxx':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Reservaciones por Cliente</h2>
                    <ReservacionesClienteForm
                        isLoading={isLoading}
                        onSubmit={handleBuscarReservaciones}
                        reservaciones={reservacionesCliente}
                    />
                </div>
            );
            
        case 'list-reservaciones':
            return <ReservacionList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
        default:
            return null;
    }
};
