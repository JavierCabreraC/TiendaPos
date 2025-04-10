import type { TimeSlot } from '@/types/index.types';
import { useTimeSlots } from '@/hooks/shared/useTimeSlots';
import {isSlotPassed, TIME_SLOTS} from '@/services/index.services';


interface TimeSlotSelectorProps {
    selectedDate: string;
    onSelectSlot: (slot: TimeSlot) => void;
    disabled?: boolean;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = (
    { selectedDate, onSelectSlot, disabled = false }
) => {
    const { availability, loading } = useTimeSlots({
        selectedDate,
        onError: (error) => console.error('Error cargando horarios:', error)
    });

    const getSlotStatus = (slotId: number): {
        available: boolean;
        message: string;
    } => {
        if (!availability[slotId]) {
            const slot = TIME_SLOTS.find(s => s.id === slotId);
            if (slot && isSlotPassed(slot, selectedDate)) {
                return {
                    available: false,
                    message: 'Horario pasado'
                };
            }
            return {
                available: false,
                message: 'No disponible'
            };
        }
        return {
            available: true,
            message: 'Disponible'
        };
    };

    if (loading) {
        return <div>Cargando horarios disponibles...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TIME_SLOTS.map(slot => {
                    const status = getSlotStatus(slot.id);
                    return (
                        <button
                            key={slot.id}
                            onClick={() => status.available && onSelectSlot(slot)}
                            disabled={disabled || !status.available}
                            className={`
                                p-4 rounded-lg transition-colors relative
                                ${status.available
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }
                            `}
                        >
                            <div className="text-sm font-medium">
                                {slot.start} - {slot.end}
                            </div>
                            <div className="text-xs">
                                {slot.periodo}
                            </div>
                            {!status.available && (
                                <div className="text-xs mt-1 text-gray-600">
                                    {status.message}
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
            <div className="text-sm text-gray-500 mt-2">
                Nota: Los horarios se actualizan automáticamente cada 30 segundos
            </div>
        </div>
    );
};
