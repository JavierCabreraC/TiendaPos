import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { MascotasList } from '@/components/client/listados/MascotasList';
import type { MascotaCliVet, BusquedaHistorialState } from '@/types/vetdoc';


export const HistorialMascotas: React.FC = () => {
    const [state, setState] = useState<BusquedaHistorialState>({
        mascotas: [],
        searchCI: '',
        isLoading: false,
        error: null
    });

    const handleSearch = async () => {
        if (!state.searchCI.trim()) {
            setState(prev => ({ ...prev, error: 'Ingrese un número de CI' }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const data = await ApiService.fetch<MascotaCliVet[]>(
                `${API_CONFIG.ENDPOINTS.DOC_CLIENTE}/${state.searchCI}`,
                { method: 'GET' }
            );
            
            setState(prev => ({
                ...prev,
                mascotas: data,
                isLoading: false,
                error: data.length === 0 ? 'No se encontraron mascotas para este cliente' : null
            }));
        } catch (error) {
            console.error('Error al buscar mascotas:', error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Error al buscar mascotas. Intente nuevamente.'
            }));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Historial Clínico</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                    <div className="flex gap-4 mb-4">
                        <Input
                            type="text"
                            placeholder="Ingrese CI del cliente..."
                            value={state.searchCI}
                            onChange={(e) => setState(prev => ({
                                ...prev,
                                searchCI: e.target.value,
                                error: null
                            }))}
                            className="flex-1"
                        />
                        <Button 
                            onClick={handleSearch}
                            disabled={state.isLoading}
                        >
                            <Search size={20} className="mr-2" />
                            {state.isLoading ? 'Buscando...' : 'Buscar'}
                        </Button>
                    </div>
                    {state.error && (
                        <p className="text-red-500 text-sm mt-2">{state.error}</p>
                    )}
                </div>
                
                {state.mascotas.length > 0 && (
                    <div className="mt-6">
                        <MascotasList mascotas={state.mascotas} />
                    </div>
                )}
            </div>
        </div>
    );
};
