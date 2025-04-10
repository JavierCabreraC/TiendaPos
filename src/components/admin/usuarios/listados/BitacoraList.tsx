import { useEffect, useState } from 'react';
import type { Bitacora } from '@/types/admin';
import { Column, DataTable } from '@/components/ui/DataTable';
import { API_CONFIG, ApiService } from '@/services/index.services';


interface BitacoraListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const BitacoraList: React.FC<BitacoraListProps> = ({ isLoading, setIsLoading }) => {
    const [logList, setLogList] = useState<Bitacora[]>([]);

    const logColumns: Column<Bitacora>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'UsuarioID', header: 'Usuario ID' },
        { key: 'Accion', header: 'Acción' },
        { key: 'IPDir', header: 'Dirección IP' },
        { 
            key: 'Fecha_Hora', 
            header: 'Fecha y Hora',
            render: (bitacora: Bitacora) => new Date(bitacora.Fecha_Hora).toLocaleString()
        }
    ];

    const renderLogMobileCard = (bitacora: Bitacora) => (
        <div key={bitacora.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{bitacora.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Usuario ID: </span>
                <span>{bitacora.UsuarioID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Acción: </span>
                <span>{bitacora.Accion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">IP: </span>
                <span>{bitacora.IPDir}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha y Hora: </span>
                <span>{new Date(bitacora.Fecha_Hora).toLocaleString()}</span>
            </div>
        </div>
    );

    const loadLogData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Bitacora[]>(`${API_CONFIG.ENDPOINTS.ADM_LOGS}`, {
                method: 'GET',
            });
            setLogList(data);
        } catch (error) {
            console.error('Error al cargar bitácora:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadLogData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={logList}
                    columns={logColumns}
                    renderMobileCard={renderLogMobileCard}
                />
            )}
        </div>
    );
};
