import { useState, useEffect } from 'react';
import type { MascotaV } from '@/types/vetdoc';
import { API_CONFIG, ApiService } from '@/services/index.services';


interface UseMascotasResult {
    mascotas: MascotaV[];
    isLoading: boolean;
    error: Error | null;
}

export const useMascotas = (clienteId: number): UseMascotasResult => {
    const [mascotas, setMascotas] = useState<MascotaV[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const cargarMascotas = async () => {
            try {
                const data = await ApiService.fetch<MascotaV[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_MASCOTAS}/${clienteId}`,
                    { method: 'GET' }
                );
                setMascotas(data);
                setError(null);
            } catch (error) {
                console.error('Error al cargar mascotas:', error);
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        if (clienteId) {
            cargarMascotas();
        }
    }, [clienteId]);

    return { mascotas, isLoading, error };
};
