import { useEffect, useState } from 'react';
import { Column, DataTable } from '@/components/ui/index.ui';
import type { VacunacionRegistro } from '@/types/index.types';
import { API_CONFIG, ApiService } from '@/services/index.services';


export const VacunacionList: React.FC = () => {
    const [registros, setRegistros] = useState<VacunacionRegistro[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarRegistros = async () => {
            try {
                const data = await ApiService.fetch<VacunacionRegistro[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_REGVAC}`,
                    { method: 'GET' }
                );
                setRegistros(data);
            } catch (error) {
                console.error('Error al cargar registros:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarRegistros();
    }, []);

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString();
    };

    const columns: Column<VacunacionRegistro>[] = [
        { key: 'MascotaID', header: 'MascotaID' },
        { key: 'Nombre', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Vacuna', header: 'Vacuna' },
        { 
          key: 'Fecha_De_Vacunacion', 
          header: 'Fecha de Vacunación',
          render: (registro) => formatDate(registro.Fecha_De_Vacunacion)
        },
        { 
          key: 'Proxima_Fecha', 
          header: 'Próxima Fecha',
          render: (registro) => formatDate(registro.Proxima_Fecha)
        }
    ];

    const renderMobileCard = (registro: VacunacionRegistro) => (
        <div key={`${registro.Nombre}-${registro.Fecha_De_Vacunacion}`} 
             className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">MascotaID: </span>
                <span className="text-gray-600">{registro.MascotaID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Mascota: </span>
                <span className="text-gray-600">{registro.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Raza: </span>
                <span className="text-gray-600">{registro.Raza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Vacuna: </span>
                <span className="text-gray-600">{registro.Vacuna}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha de Vacunación: </span>
                <span className="text-gray-600">{formatDate(registro.Fecha_De_Vacunacion)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Próxima Fecha: </span>
                <span className="text-gray-600">{formatDate(registro.Proxima_Fecha)}</span>
            </div>      
        </div>
    );

    if (isLoading) {
        return <div className="text-center py-8">Cargando registros...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Registros de Vacunación</h2>
            <DataTable<VacunacionRegistro>
                data={registros}
                columns={columns}
                renderMobileCard={renderMobileCard}
            />
        </div>
    );
};
