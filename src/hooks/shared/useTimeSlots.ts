import { useState, useEffect } from 'react';
import type {ReservedTimeSlot, TimeSlot} from '@/types/index.types';
import { API_CONFIG, ApiService, TIME_SLOTS } from '@/services/index.services';


interface UseTimeSlotsProps {
    selectedDate: string;
    onError?: (error: Error) => void;
}

export const useTimeSlots = ({ selectedDate, onError }: UseTimeSlotsProps) => {
    const [availability, setAvailability] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);

    const isSlotPassed = (slot: TimeSlot, date: string): boolean => {
        const now = new Date();
        const slotDateTime = new Date(`${date} ${slot.start}`);
        return slotDateTime <= now;
    };

    const fetchDayReservations = async () => {
        try {
            setLoading(true);

            // Inicializar todos los slots
            const newAvailability = TIME_SLOTS.reduce((acc, slot) => {
                // Primero verificar si el horario ya pasó
                const isPassed = isSlotPassed(slot, selectedDate);
                acc[slot.id] = !isPassed; // false si ya pasó, true si no
                return acc;
            }, {} as Record<number, boolean>);

            // Obtener las reservaciones ocupadas
            const reservedSlots = await ApiService.fetch<ReservedTimeSlot[]>(
                `${API_CONFIG.ENDPOINTS.CLI_RESERVAGRAL}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Marcar como no disponibles los slots que coinciden con reservaciones
            reservedSlots.forEach(reserved => {
                if (reserved.Estado === 'Pendiente') {
                    const reservedDate = new Date(reserved.Fecha_Hora)
                        .toISOString()
                        .split('T')[0];

                    if (reservedDate === selectedDate) {
                        const reservedTime = new Date(reserved.Fecha_Hora)
                            .toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            });

                        const matchingSlot = TIME_SLOTS.find(slot =>
                            slot.start === reservedTime
                        );

                        if (matchingSlot) {
                            newAvailability[matchingSlot.id] = false;
                        }
                    }
                }
            });

            setAvailability(newAvailability);
        } catch (error) {
            onError?.(error instanceof Error ? error : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedDate) return;

        fetchDayReservations();

        // Configurar polling cada 30 segundos
        const interval = setInterval(fetchDayReservations, 30000);

        return () => clearInterval(interval);
    }, [selectedDate]);

    return {
        availability,
        loading,
        isSlotAvailable: (slotId: number) => availability[slotId] ?? false
    };
};
