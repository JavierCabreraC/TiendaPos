import { useState } from 'react';
import { ApiResponse, FormTypes } from '@/types/index.types';
import { ApiService, API_CONFIG } from '@/services/index.services';


interface UseFormHandlerProps<T extends FormTypes> {
    formType: 'personal' | 'cliente' | 'mascota';
    initialState: T;
    onSuccess?: (response: ApiResponse) => void;
}

export const useFormHandler = <T extends FormTypes>({ 
    formType, 
    initialState,
    onSuccess 
}: UseFormHandlerProps<T>) => {
    const [form, setForm] = useState<T>(initialState);

    const resetForm = () => setForm(initialState);

    const handleSubmit = async () => {
        const endpointMap = {
            personal: API_CONFIG.ENDPOINTS.ADM_PERSONAL,
            cliente: API_CONFIG.ENDPOINTS.ADM_CLIENTES,
            mascota: API_CONFIG.ENDPOINTS.ADM_MASCOTAS
        };

        try {
            const response: ApiResponse = await ApiService.fetch(endpointMap[formType], {
                method: 'POST',
                body: JSON.stringify(form)
            });
            
            resetForm();
            onSuccess?.(response);
            
            return response;
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            throw error;
        }
    };

    const handleInputChange = (name: keyof T, value: string | number) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        form,
        setForm,
        handleSubmit,
        handleInputChange,
        resetForm
    };
};
