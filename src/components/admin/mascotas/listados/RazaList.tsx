import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Raza, ViewState } from '@/types/admin';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
// import { Column, DataTable } from '@/components/ui/DataTable';


interface RazaListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    setCurrentView: (view: ViewState) => void;
}

export const RazaList: React.FC<RazaListProps> = ({ 
    isLoading, 
    setIsLoading,
    setCurrentView 
}) => {
    const [razaList, setRazaList] = useState<Raza[]>([]);

    const razaColumns: Column<Raza>[] = [
        { key: 'RazaID', header: 'ID' },
        { key: 'NombreRaza', header: 'Raza' },
        { key: 'NombreEspecie', header: 'Especie' }
    ];

    const renderRazaMobileCard = (raza: Raza) => (
        <div key={raza.RazaID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{raza.RazaID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Raza: </span>
                <span>{raza.NombreRaza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Especie: </span>
                <span>{raza.NombreEspecie}</span>
            </div>
        </div>
    );

    const loadRazas = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Raza[]>(`${API_CONFIG.ENDPOINTS.ADM_RAZA}`, {
                method: 'GET',
            });
            setRazaList(data);
        } catch (error) {
            console.error('Error al cargar razas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRazas();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Razas Registradas</h2>
                <Button onClick={() => setCurrentView('create-raza')}>
                    <Plus className="mr-2" size={16} />
                    Nueva Raza
                </Button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={razaList}
                    columns={razaColumns}
                    renderMobileCard={renderRazaMobileCard}
                />
            )}
        </div>
    );
};
